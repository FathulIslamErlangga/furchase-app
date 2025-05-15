import React from "react";
import Image from "next/image";
import "@/style/auth/register.css";
import Link from "next/link";
type Props = {};

const RegisterPage = () => {
  return (
    <section className=" registers-page">
      <div className=" page-container">
        <div className=" content-register">
          <div className=" form">
            <div className=" first-form">
              <form action="">
                <label htmlFor="">First Name</label>
                <button>
                  <Image
                    src="/assets/images/id.png"
                    alt=""
                    height={18}
                    width={18}
                  />
                </button>
                <input type="text" placeholder="First Name" />
              </form>
              <form action="">
                <label htmlFor="">Last Name</label>
                <button>
                  <Image
                    src="/assets/images/id.png"
                    alt=""
                    height={18}
                    width={18}
                  />
                </button>
                <input type="text" placeholder="Last Name" />
              </form>
            </div>
            <div className=" second-form">
              <form action="">
                <label htmlFor="">Email</label>
                <button>
                  <Image
                    src="/assets/images/mail.png"
                    alt=""
                    height={18}
                    width={18}
                  />
                </button>
                <input type="text" placeholder="Email" />
              </form>
              <form action="">
                <label htmlFor="">Password</label>
                <button>
                  <Image
                    src="/assets/images/view.png"
                    alt=""
                    height={18}
                    width={18}
                  />
                </button>
                <input type="password" placeholder="Password" />
              </form>
            </div>
          </div>
          <div className="btn-register">
            <button>Register</button>
          </div>
          <span>
            Already have an account ?{" "}
            <Link
              href=""
              className=" underline text-[15px] hover:text-oranges-primary"
            >
              Log In
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
        <div className="w-1/2">
          <Image
            src="/assets/images/bg-register.png"
            alt=""
            width={450}
            height={450}
          />
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
