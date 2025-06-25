import { useEffect } from "react";

const Wiki = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const wikis = [
    {
      label: "How to: Navigate the shared drive",
      video: (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/KN4NKAgrnUo?si=suT0vz4qO4jqShsp"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      ),
      description:
        "This video shows you how to navigate the shared drive and find important folders",
    },
    {
      label: "How to: Create a new project",
      video: (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/PHarF438EQk?si=BcDqMnBtBB_r_-WV"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      ),
      description:
        "This video walks you through creating a project in GitLab, cloning it, and opening it with your terminal",
    },
    {
      label: "How to: Share your code in GitLab",
      video: (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/IRrCPWDjvD8?si=NbdKH1IhjvEWMg5O"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      ),
      description: "This video shows you how to share your code in GitLab",
    },
    {
      label: "How to: Use VS Code extensions",
      video: (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/YD6QY0VNctU?si=daXEs7x3IEE6BK0D"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      ),
      description: "This video shows you some popular VS Code extensions",
    },
    {
      label: "How to: Install TailwindCSS",
      video: (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/Th762a78sUk?si=qSr9kl_s9vWotCDh"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      ),
      description:
        "This video walks you through the installation of TailwindCSS",
    },
    {
      label: "How to: Navigate TailwindCSS",
      video: (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/U3rxsCUdrZg?si=mONLFYIZYnai-O6f"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      ),
      description:
        "This video shows you how to navigate the TailwindCSS website",
    },
    {
      label: "How to: Navigate Flowbite",
      video: (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/60YQ_Thry_E?si=P2a6-T6lKnhYoqxh"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      ),
      description: "This video shows you how to navigate the Flowbite website",
    },
    {
      label: "How to: Bookmark a website",
      video: (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/vougEK_1-dk?si=0Lw1vkwG8wjIixy5"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      ),
      description: "This video shows you how to make a bookmark for a website",
    },
  ];
  return (
    <>
      <div className="text-[#6ecfd5] pt-44 numans text-7xl text-center">
        <div className="flex flex-row justify-self-center">
          <img src="plug.svg" className="h-18 mr-2" alt="Flowbite Logo" />
          <span className="text-neutral-50">wiki</span>Connect
        </div>
      </div>
      <div className="grid grid-col md:grid-cols-2 lg:grid-cols-3 gap-8 pt-24 rubik mx-24">
        {wikis.map((wiki, index) => (
          <div key={index}>
            <div className="text-[#6ecfd5] text-2xl justify-self-center pb-4 ">
              {wiki.label}
            </div>
            <div className="justify-self-center ">{wiki.video}</div>
            <div className="text-white text-center max-w-lg mb-24 transition-colors duration-300 ml-4 pt-4">
              {wiki.description}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Wiki;
