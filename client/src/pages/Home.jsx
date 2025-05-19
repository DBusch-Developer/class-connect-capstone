import { Link } from "react-router";
import TrueFocus from "../components/TrueFocus";

const Home = () => {
  const topics = [
    {
      link: "/blog-list",
      label: "Check out our blog",
      description:
        "Connect with your classmates on our blog section. Post your questions and comments, and engage in meaningful discussions with your team. Our mentors are always eager to share their knowledge and help you along your coding journey.",
      image: (
        <img
          className="rounded-md opacity-15 w-[25vw] h-[45vh] border border-white"
          src={
            new URL("../assets/images/blue-bubble.jpg", import.meta.url).href
          }
        />
      ),
    },
    {
      link: "/wiki",
      label: "Explore the Wiki",
      description:
        "We invite you to explore our Wiki section, where you'll find comprehensive video guides to help you navigate GitLab, VS Code, your browser, and much more.",
      image: (
        <img
          className="rounded-md opacity-15 w-[25vw] h-[45vh] border border-white"
          src={new URL("../assets/images/computer.jpg", import.meta.url).href}
        />
      ),
    },
    {
      link: "/whitelist",
      label: "The Whitelist",
      description:
        "Our whitelist includes the latest resources and tools relevant to your coding journey. From open-source libraries to documentation repositories, our whitelisted sites offer a wealth of information at your fingertips.",
      image: (
        <img
          className="rounded-md opacity-15 w-[25vw] h-[45vh] border border-white"
          src={new URL("../assets/images/code4.jpg", import.meta.url).href}
        />
      ),
    },
  ];

  return (
    <>
      <div className="bg-black h-[105vh] numans">
        <div className="text-[#6ecfd5] pt-44 numans text-7xl text-center">
          <div className="flex flex-row justify-self-center">
            <img src="plug.svg" className="h-18 mr-2" alt="Flowbite Logo" />
            <span className="text-neutral-50">class</span>Connect
          </div>
        </div>
        <div className="pt-4">
          <TrueFocus
            sentence="Communicate. Collaborate. Contribute."
            manualMode={false}
            blurAmount={5}
            borderColor="#6ecfd5"
            animationDuration={1}
            pauseBetweenAnimations={1}
          />
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pt-36 justify-self-center">
          {topics.map((topic, index) => (
            <Link to={`${topic.link}`}>
              <div className="" key={index}>
                <div className="text-[#6ecfd5] text-3xl rubik justify-self-center pb-2">
                  {topic.label}
                </div>
                <div className="absolute text-white text-center text-2xl max-w-md pt-20 pl-5 pr-5 mx-5 numans">
                  {topic.description}
                </div>
                <div className="rounded-lg">{topic.image}</div>
              </div>
            </Link>
          ))}

      
        </div>
      </div>
    </>
  );
};

export default Home;
