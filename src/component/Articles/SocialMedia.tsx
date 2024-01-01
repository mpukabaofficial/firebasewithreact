import { Article } from "./ArticlesStructure";
import facebook from "../../assets/social icons/facebook.svg";
import instagram from "../../assets/social icons/instagram.svg";
import twitter from "../../assets/social icons/x-twitter.svg";
import phone from "../../assets/social icons/phone-solid.svg";
import mail from "../../assets/social icons/envelope-regular.svg";
import whatsapp from "../../assets/social icons/whatsapp.svg";
import website from "../../assets/social icons/globe-solid.svg";

interface Props {
  article: Article | undefined;
}

const SocialMedia = ({ article }: Props) => {
  return (
    <div>
      <h2 className="mx-auto w-[50%] text-center text-2xl font-semibold ">
        Get in contact
      </h2>

      <div className="social-links flex flex-wrap gap-2">
        {!!article?.facebook && (
          <a href={article?.facebook}>
            <img src={facebook} alt="facebook" />
          </a>
        )}
        {!!article?.instagram && (
          <a href={article?.instagram}>
            <img src={instagram} alt="instagram" />
          </a>
        )}
        {!!article?.twitter && (
          <a href={article?.twitter}>
            <img src={twitter} alt="twitter" />
          </a>
        )}
        {!!article?.whatsApp && (
          <a href={article?.whatsApp}>
            <img src={whatsapp} alt="whatsapp" />
          </a>
        )}
        {!!article?.website && (
          <a href={article?.website}>
            <img src={website} alt="website" />
          </a>
        )}
        {!!article?.phone && (
          <a href={"tel:" + article?.phone}>
            <img src={phone} alt="phone" />
          </a>
        )}
        {!!article?.authorEmail && (
          <a href={"mailto:" + article?.authorEmail}>
            <img src={mail} alt="email" />
          </a>
        )}
      </div>
    </div>
  );
};

export default SocialMedia;
