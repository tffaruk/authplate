import DynamicIcon from "@/helpers/DynamicIcon";
import ImageFallback from "@/helpers/ImageFallback";
import { authOptions } from "@/lib/auth";
import { getListPage } from "@/lib/contentParser";
import { fetchUser } from "@/lib/fetchUser";
import { stripe } from "@/lib/utils/stripe";
import { markdownify } from "@/lib/utils/textConverter";
import CallToAction from "@/partials/CallToAction";
import Pricing from "@/partials/Pricing";
import SeoMeta from "@/partials/SeoMeta";
import Testimonials from "@/partials/Testimonials";
import {
  Client,
  Experience,
  Feature,
  Feature_Details,
  Features,
} from "@/types";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { FaRegCircleCheck } from "react-icons/fa6";

const Home = async () => {
  const session = await getServerSession(authOptions);
  const user = await fetchUser(session);
  const homepage = getListPage("homepage/_index.md");
  const testimonial = getListPage("sections/testimonial.md");
  const callToAction = getListPage("sections/call-to-action.md");
  const { frontmatter } = homepage;
  const {
    banner,
    feature_details,
    client,
    action,
    experience,
    feature,
    pricing,
  }: {
    banner: { title: string; image: string; content?: string; button?: any };
    client: Client[];
    feature_details: Feature_Details[];
    action: Feature_Details;
    experience: Experience;
    feature: Features;
    pricing: any;
  } = frontmatter;

  const stripeResponse = await stripe.prices.list();
  const products = (await stripe.products.list()).data;
  const plans = stripeResponse.data;

  const productsData = products.map((product) => {
    const plan = plans.filter((plan) => plan.product === product.id);
    return {
      name: product.name,
      id: product.id,
      prices: plan.map((item) => {
        return {
          product: item.product,
          id: item.id,
          interval: item.recurring?.interval,
          amount: item.unit_amount,
          currency: item.currency,
        };
      }),
    };
  });

  return (
    <>
      <SeoMeta />
      <section>
        <div className="container">
          {user?.isValid === false && (
            <p className="text-center">
              Your email address is not verified yet{" "}
              <Link
                className=" px-1 text-white rounded-sm bg-red-500 "
                href="/verify-email"
                as={`/verify-email`}
              >
                Verify Email
              </Link>
            </p>
          )}
        </div>
      </section>
      <section className="section pt-14">
        <div className="container">
          <div className="row justify-center">
            <div className="mb-16 text-center lg:col-7">
              <h1
                className="mb-4"
                dangerouslySetInnerHTML={markdownify(banner.title)}
              />
              <p
                className="mb-8"
                dangerouslySetInnerHTML={markdownify(banner.content ?? "")}
              />
              {banner.button!.enable && (
                <a className="btn btn-primary" href={banner.button!.link}>
                  {banner.button!.label}
                </a>
              )}
            </div>
            {banner.image && (
              <div className="col-12 mb-14">
                <ImageFallback
                  src={banner.image}
                  className="mx-auto"
                  width="800"
                  height="420"
                  alt="banner image"
                  priority
                />
              </div>
            )}
          </div>
          <div className="row justify-between items-center">
            <div className="col-12">
              <p className="text-xl font-normal mb-8 text-center">
                Trusted by the world’s leading organizations
              </p>
              <div className="flex flex-wrap justify-between items-center">
                {client.map((item: Client) => (
                  <ImageFallback
                    className="opacity-50"
                    src={item}
                    height="50"
                    width="146"
                    alt={item}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`section-sm bg-theme-light/30`}>
        <div className="container">
          <div className="row items-center justify-between">
            <div className={`mb:md-0 mb-6 md:col-4 `}>
              <ImageFallback
                src={action.image}
                height={480}
                width={520}
                alt={action.title}
              />
            </div>
            <div className={`md:col-7 lg:col-6 `}>
              <h2
                className="mb-4"
                dangerouslySetInnerHTML={markdownify(action.title)}
              />
              <p
                className="mb-8 text-lg"
                dangerouslySetInnerHTML={markdownify(action.content)}
              />
              <ul className="flex flex-wrap">
                {action.bulletpoints.map((bullet: string) => (
                  <li className="relative mb-4 pl-6 w-1/2" key={bullet}>
                    <FaRegCircleCheck className={"absolute left-0 top-1.5"} />
                    <span dangerouslySetInnerHTML={markdownify(bullet)} />
                  </li>
                ))}
              </ul>
              {action.button.enable && (
                <a className="btn btn-primary mt-5" href={action.button.link}>
                  {action.button.label}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* experience and benefits */}
      <section className="section-sm">
        <div className="container">
          <div className="row items-center justify-between">
            <div className="col-12">
              <h2 className="mb-14 text-center">{experience.title}</h2>
            </div>
          </div>
          <div className="row items-center justify-between">
            {experience.benefits.map((benefit, index: number) => (
              <div className="col-12 md:col-4" key={index}>
                <div className=" text-center bg-theme-light rounded-lg p-10  ">
                  <ImageFallback
                    className="mx-auto mb-8"
                    src={benefit.image}
                    height={190}
                    width={190}
                    alt={benefit.title}
                  />
                  <h3
                    className="mb-4 text-h4 leading-9"
                    dangerouslySetInnerHTML={markdownify(benefit.title)}
                  />
                  <p
                    className="text-light text-base font-normal"
                    dangerouslySetInnerHTML={markdownify(benefit.content)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-theme-light/30">
        <div className="container">
          <div className="row items-center justify-between">
            <div className="col-12">
              <h2 className="mb-14 text-center">{feature.title}</h2>
            </div>
          </div>
          <div className="row items-center justify-between">
            {feature.features.map((feature: Feature, index: number) => (
              <div className="col-12 md:col-4" key={index}>
                <div className="bg-theme-light rounded-lg p-10 mb-6">
                  <span className="border p-2 rounded-md mb-4 border-dark/70 inline-flex justify-center">
                    <DynamicIcon className="w-6 h-6" icon={feature.icon} />
                  </span>
                  <h3
                    className="mb-4 text-h4 leading-9"
                    dangerouslySetInnerHTML={markdownify(feature.title)}
                  />
                  <p
                    className="text-light text-base font-normal"
                    dangerouslySetInnerHTML={markdownify(feature.content)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {feature_details.map((feature, index: number) => (
        <section key={index} className={`section-sm `}>
          <div className="container">
            <div className="row items-center justify-between">
              <div
                className={`mb:md-0 mb-6 md:col-5 ${
                  index % 2 !== 0 && "md:order-2"
                }`}
              >
                <ImageFallback
                  src={feature.image}
                  height={480}
                  width={520}
                  alt={feature.title}
                />
              </div>
              <div
                className={`md:col-7 lg:col-6 ${
                  index % 2 !== 0 && "md:order-1"
                }`}
              >
                <h2
                  className="mb-4"
                  dangerouslySetInnerHTML={markdownify(feature.title)}
                />
                <p
                  className="mb-8 text-lg"
                  dangerouslySetInnerHTML={markdownify(feature.content)}
                />
                <ul>
                  {feature.bulletpoints.map((bullet: string) => (
                    <li className="relative mb-4 pl-6" key={bullet}>
                      <FaRegCircleCheck className={"absolute left-0 top-1.5"} />
                      <span dangerouslySetInnerHTML={markdownify(bullet)} />
                    </li>
                  ))}
                </ul>
                {feature.button.enable && (
                  <a
                    className="btn btn-primary mt-5"
                    href={feature.button.link}
                  >
                    {feature.button.label}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      <Pricing pricing={pricing} products={productsData} />
      <Testimonials data={testimonial} />
      <CallToAction data={callToAction} />
    </>
  );
};

export default Home;
