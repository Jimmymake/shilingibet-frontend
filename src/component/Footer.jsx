import { Link } from "react-router-dom";
import { FaAndroid } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialIcons = [
    // {
    //   src: "https://img.icons8.com/color/48/phone.png",
    //   alt: "phone",
    //   link: "",
    //   // link: "tel:+254700000000",
    // },
    // {
    //   src: "https://img.icons8.com/color/48/whatsapp--v1.png",
    //   alt: "whatsapp",
    //   link: "",
    //   // link: "https://wa.me/254700000000",
    // },
    {
      src: "https://img.icons8.com/color/48/instagram-new--v1.png",
      alt: "instagram",
      link: "https://www.instagram.com/ShilingiBetke/",
    },
    {
      src: "https://img.icons8.com/color/48/facebook-new.png",
      alt: "facebook",
      link: "https://www.facebook.com/profile.php?id=61579986545658",
    },
    {
      src: "https://img.icons8.com/color/48/twitterx--v1.png",
      alt: "twitter-x",
      link: "https://x.com/ShilingiBetke",
    },
    // {
    //   src: "https://img.icons8.com/color/48/tiktok--v1.png",
    //   alt: "tiktok",
    //   link: "",
    //   //  link: "https://www.tiktok.com/@tenabets_ke?_t=ZM-8yIr6X2fXNu&_r=1",
    // },
  ];

  const SocialLinks = () => (
    <div className="flex justify-center gap-4 mt-4">
      {socialIcons.map((icon, index) => (
        <Link
          key={index}
          to={icon.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            width="28"
            height="28"
            src={icon.src}
            alt={icon.alt}
            className="hover:scale-110 transition-transform"
          />
        </Link>
      ))}
    </div>
  );

  return (
    <footer className="bg-secondary text-[rgb(151,137,205)]/90 px-4 py-6 text-sm mt-10 xs:mb-20">
      {/* Desktop Layout */}
      <div className="hidden md:flex justify-between items-center max-w-6xl mx-auto border border-gray-700 rounded-lg p-6">
        {/* License Section */}
        <div className="w-1/3 text-gray-400">
          <h3 className="text-[rgb(151,137,205)] font-bold text-base mb-2">
            License
          </h3>
          <p className="text-[rgb(151,137,205)]/90">
            ShilingiBet is Owned and Operated By CyberQuest Entertainment,
            Licensed by BCLB (Betting Control and Licensing Board of Kenya)
            under the Betting, Lotteries and Gaming Act, Cap 131, Laws of Kenya.
          </p>
        </div>

        {/* Center Section */}
        <div className="w-1/3 text-center px-4">
          <img
            src="/logo.png"
            alt="ShilingiBet Logo"
            className="mx-auto mb-3 w-28"
          />
          <h3 className="text-[rgb(151,137,205)] font-bold text-base mb-2">
            Responsible Gaming Policy
          </h3>
          <p className="text-[rgb(151,137,205)]/90 leading-relaxed">
            Note that this is a real-money gambling app. Please gamble
            responsibly and only bet what you can afford. For Gambling addiction
            get help and support by visiting{" "}
            <Link
              to="https://www.responsiblegambling.or.ke"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline"
            >
              www.responsiblegambling.or.ke
            </Link>
            . For more information view our responsible gaming policy{" "}
            <Link to="#" className="text-primary underline">
              here
            </Link>
            .
          </p>
          <p className="mt-4 text-[rgb(151,137,205)]/90">
            Terms and Conditions | Responsible Gaming Policy
          </p>
          <SocialLinks /> {/* Android Download Button */}
        </div>

        {/* Right Section */}
        <div className="w-1/3 text-center text-gray-400">
          <div className="flex justify-center mb-2">
            <span className="bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1">
              18+
            </span>
          </div>
          <p className="text-[rgb(151,137,205)]/90">
            You must be 18 years of age or older to register or play at
            ShilingiBet. Gambling may be addictive if not made with moderation.
            Gamble Responsibly.
          </p>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden space-y-4  rounded-lg p-4 text-center">
        <img
          src="/logo.png"
          alt="ShilingiBet Logo"
          className="mx-auto mb-3 w-28"
        />
        <div>
          <h3 className="text-[rgb(151,137,205)] font-bold text-base">
            License
          </h3>
          <p className="text-[rgb(151,137,205)]/90 mt-2">
            ShilingiBet is Owned and Operated By CyberQuest Entertainment,
            Licensed by BCLB (Betting Control and Licensing Board of Kenya)
            under the Betting, Lotteries and Gaming Act, Cap 131, Laws of Kenya.
          </p>
        </div>
        <div>
          <h3 className="text-[rgb(151,137,205)] font-bold text-base">
            Responsible Gaming Policy
          </h3>
          <p className="text-[rgb(151,137,205)]/90 mt-2">
            Note that this is a real-money gambling app. Please gamble
            responsibly and only bet what you can afford. For Gambling addiction
            get help and support by visiting{" "}
            <Link
              to="https://www.responsiblegambling.or.ke"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline"
            >
              www.responsiblegambling.or.ke
            </Link>
            .
          </p>
        </div>
        <div>
          <p className="text-[rgb(151,137,205)]/90">
            You must be 18 years of age or older to register or play at
            ShilingiBet. Gambling may be addictive if not made with moderation.
            Gamble Responsibly.
          </p>
        </div>
        <div>
          <h3 className="text-[rgb(151,137,205)] font-bold text-base">
            Information
          </h3>
          <p className="text-[rgb(151,137,205)]/90">
            Terms and Conditions | Responsible Gaming Policy
          </p>
        </div>
        <div>
          <h3 className="text-[rgb(151,137,205)] font-bold text-base">
            Contact Us
          </h3>
          <SocialLinks />{" "}
          <a
            href="/ndege.apk"
            className="mt-10 inline-flex items-center gap-2 bg-[#f9ce36] text-[rgb(25,25,57)] font-bold px-4 py-2 rounded-lg transition-all duration-300 "
          >
            <FaAndroid className="w-5 h-5" />
            Download Android App
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <p className="text-center text-xs text-[rgb(151,137,205)]/80 mt-4 mb-12 lg:mb-0">
        © {currentYear} ShilingiBet. All Rights Reserved
      </p>
    </footer>
  );
}
