import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "./prisma";
import slugify from "slugify/slugify";
import bcrypt from "bcrypt";
import "dotenv/config";
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUserGoogle = await prisma.user.findUnique({
          where: { googleId: profile.id },
        });
        if (existingUserGoogle) return done(null, existingUserGoogle);
        const slugData = await slugify(
          `${profile.name?.givenName}-${profile.name?.familyName}`,
          {
            strict: true,
            lower: true,
          }
        );
        let slug = slugData;
        let count = 1;
        while (await prisma.user.findUnique({ where: { slug } })) {
          slug = `${slugData}-${count}`;
          count++;
        }
        const password = await bcrypt.hash("coklat", 10);
        const voucherGenerator = `DISC-${Math.random()
          .toString(36)
          .substring(2, 8)
          .toLocaleUpperCase()}`;
        const user = await prisma.user.create({
          data: {
            email: profile.emails?.[0].value || "",
            googleId: profile.id,
            slug,
            password,
            profiles: {
              create: {
                firstName: profile.name?.givenName || "user",
                lastName: profile.name?.familyName || "1",
                images: {
                  create: {
                    type: "cover profile",
                    url: profile.photos?.[0].value ?? "",
                  },
                },
              },
            },
            vouchers: {
              create: {
                code: voucherGenerator,
                usageLimit: 1,
                isActive: false,
                discounts: {
                  create: {
                    percent: 10,
                    name: "Voucher Discount",
                    startDate: new Date(),
                    endDate: new Date(new Date().getMonth() + 1),
                  },
                },
              },
            },
          },
        });

        return done(null, user);
      } catch (error) {
        return done(error, undefined);
      }
    }
  )
);
