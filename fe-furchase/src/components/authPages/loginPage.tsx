import Image from "next/image";
import React from "react";
import "@/style/auth/login.css";
import Link from "next/link";
type Props = {};

const LoginPage = (props: Props) => {
  return (
    <section className="login-page">
      <div className="page-container">
        <div className="content-login">
          <div className="form-input">
            <form action="">
              <label htmlFor="">Email</label>
              <Image
                src="/assets/images/mail.png"
                width={20}
                height={20}
                alt="login bg"
              />
              <input type="text" name="email" placeholder="Email" />
            </form>
            <form action="">
              <label htmlFor="">Password</label>
              <Image
                src="/assets/images/view.png"
                width={20}
                height={20}
                alt="login bg"
              />
              <input type="password" name="password" placeholder="Password" />
            </form>
            <Link
              href="#"
              className="pl-32 underline text-[15px] hover:text-oranges-primary"
            >
              Forgot Password
            </Link>
            <div className="btn-login">
              <button>Login</button>
            </div>
            <span>
              Don't have an account ?{" "}
              <Link
                href=""
                className="underline text-[15px] hover:text-oranges-primary"
              >
                Sign Up
              </Link>
            </span>
            <div className=" or-connection">
              <div className="line" />
              <span>OR</span>
              <div className="line" />
            </div>
            <div className="social-connect">
              <button>
                <Image
                  src="/assets/images/google.png"
                  alt=""
                  height={30}
                  width={30}
                />
              </button>
              <button>
                <Image
                  src="/assets/images/facebook.png"
                  alt=""
                  height={30}
                  width={30}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="content-img">
          <Image
            src="/assets/images/bg-login.png"
            width={450}
            height={450}
            alt="login bg"
          />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
