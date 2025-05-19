import React from 'react'

const Wiki = () => {
    const wikis = [
        {
          label: "How to: Navigate the shared drive",
          video: (
            <video className="rounded-md w-[22vw] h-[25vh]" controls>
              <source src="/public/navigating.mp4" type="video/mp4" />
            </video>
          ),
          description: "This video shows you how to navigate the shared drive and find important folders"
        },
          {
            label: "How to: Create a new project",
            video: (
              <video className="rounded-md w-[22vw] h-[25vh]" controls>
                <source src="/public/create-project.mp4" type="video/mp4" />
              </video>
            ),
            description: "This video walks you through creating a project in GitLab, cloning it, and opening it with your terminal"
          },
          {
            label: "How to: Share your code in GitLab",
            video: (
              <video className="rounded-md w-[22vw] h-[25vh]" controls>
                <source src="/public/sharing_code_gitlab.mp4" type="video/mp4" />
              </video>
            ),
            description: "This video shows you how to share your code in GitLab"
          },
          {
            label: "How to: Use VS Code extensions",
            video: (
              <video className="rounded-md w-[22vw] h-[25vh]" controls>
                <source src="/public/VSCode-Extensions.mp4" type="video/mp4" />
              </video>
            ),
            description: "This video shows you some popular VS Code extensions"
          },
          {
            label: "How to: Install TailwindCSS",
            video: (
              <video className="rounded-md w-[22vw] h-[25vh]" controls>
                <source src="/public/Tailwind-Installation.mp4" type="video/mp4" />
              </video>
               ),
              description: "This video walks you through the installation of TailwindCSS"
          },
          {
            label: "How to: Navigate TailwindCSS",
            video: (
              <video className="rounded-md w-[22vw] h-[25vh]" controls>
                <source src="/public/tailwindcssVideo.mp4" type="video/mp4" />
              </video>
            ),
            description: "This video shows you how to navigate the TailwindCSS website"
          },
          {
            label: "How to: Navigate Flowbite",
            video: (
              <video className="rounded-md w-[22vw] h-[25vh]" controls>
                <source src="/public/flowbite.mp4" type="video/mp4" />
              </video>
            ),
            description: "This video shows you how to navigate the Flowbite website"
          },
          {
            label: "How to: Bookmark a website",
            video: (
              <video className="rounded-md w-[22vw] h-[25vh]" controls>
                <source src="/public/bookmarksave.mp4" type="video/mp4" />
              </video>
            ),
            description: "This video shows you how to make a bookmark for a website"
          },
    ]
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
                    <div className="text-[#6ecfd5] text-2xl justify-self-center pb-4 ">{wiki.label}</div>
                    <div
                      className="justify-self-center "
                    >
                      {wiki.video}
                    </div>
                    <div
                      className="text-white text-center max-w-lg mb-24 transition-colors duration-300 ml-4 pt-4"
                    >
                      {wiki.description}
                    </div>
                </div>
              ))}
            </div>
    </>
  )
}

export default Wiki