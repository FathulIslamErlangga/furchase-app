import passport from "passport";
import { Strategy as facebookStrategy } from "passport-facebook";
import prisma from "./prisma";
import slugify from "slugify/slugify";
import bcrypt from "bcrypt";
import "dotenv/config";
passport.use(
  new facebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL!,
      profileFields: ["id", "emails", "name", "picture.type(large)"],
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await prisma.user.findUnique({
          where: { facebookId: profile.id },
        });
        const existingEmail = await prisma.user.findUnique({
          where: { email: profile.emails?.[0].value },
        });
        if (existingUser) return done(null, existingUser);
        const slugData = await slugify(
          `${profile.name?.givenName}-${profile.name?.familyName}`,
          { lower: true, strict: true }
        );

        if (existingEmail)
          return done(null, false, { message: "Email already in use" });
        let slug = slugData;
        let count = 1;
        while (await prisma.user.findUnique({ where: { slug } })) {
          slug = `${slugData}-${count}`;
          count++;
        }

        const password = await bcrypt.hash("conklat", 10);
        const voucherGenerator = `DISC-${Math.random()
          .toString(36)
          .substring(2, 8)
          .toLocaleUpperCase()}`;

        const user = await prisma.user.create({
          data: {
            email: profile.emails?.[0].value || "",
            password,
            slug,
            facebookId: profile.id,
            profiles: {
              create: {
                firstName: profile.name?.givenName || "",
                lastName: profile.name?.familyName || "",
                images: {
                  create: {
                    type: "coverProfile",
                    url: profile.photos?.[0].value ?? "",
                  },
                },
              },
            },
            vouchers: {
              create: {
                isActive: false,
                code: voucherGenerator,
                usageLimit: 1,
                discounts: {
                  create: {
                    startDate: new Date(),
                    endDate: new Date(
                      new Date().setMonth(new Date().getMonth() + 1)
                    ),
                    name: "Voucher Discount",
                    percent: 10,
                  },
                },
              },
            },
          },
        });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
