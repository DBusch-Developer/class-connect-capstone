import axios from "axios";
import { useState, useEffect } from "react";
import ReactMarkdown from "https://esm.sh/react-markdown@7";

const Ollama = () => {
  const [prompt, setPrompt] = useState("");
  const [finalResponse, setFinalResponse] = useState("");
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("gemma3:12b");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_NODE_SERVER_URL}/models`
        ); // Assuming you have an endpoint to fetch models
        setModels(response.data);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };
    fetchModels();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      alert("Please enter a question.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_NODE_SERVER_URL}/ollama`,
        {
          prompt: prompt,
          model: selectedModel,
        }
      );
      console.log(response);
      setFinalResponse(response.data.response);
      setPrompt("");
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("An error occurred while fetching the response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-[#6ecfd5] pt-44 numans text-7xl text-center">
        <div className="flex flex-row justify-self-center">
          <img src="plug.svg" className="h-18 mr-2" alt="class-connect-logo" />
          <span className="text-neutral-50">ollama</span>Connect
        </div>
      </div>
      <div className="pl-30 pr-30 flex flex-col m-auto  w-1/2">
        <div className="pt-8 w-full">
          <div className="flex justify-between items-center">
            <h2 className="m-auto text-2xl font-bold text-neutral-300 numans mt-8 mb-8">
              Get Instant <span className="text-[#6ecfd5] ">Answers</span> to
              Your <span className="text-[#6ecfd5] ">Queries</span>
            </h2>
          </div>
          {/* Ask Ollama a question */}
          <form onSubmit={handleSubmit} className="mb-6">
            <div>
              <label
                htmlFor="models"
                className="text-[#6ecfd5] block mb-2 text-15 font-bold numans"
              >
                Choose a Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                id="category"
                className="border border-gray-300 bg-black text-neutral-300 placeholder:text-gray-500  text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:focus:ring-gray-500 dark:focus:border-gray-500 mb-5"
              >
                {models.map((model, index) => (
                  <option key={index} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
            <label
              className="text-[#6ecfd5] block mb-2 text-15 font-bold numans"
              htmlFor="comment"
            >
              Enter Your Query
            </label>
            <div className="py-2 px-4 mb-4 bg-black rounded-lg rounded-t-lg border border-gray-200 w-full">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                id="comment"
                rows="6"
                className="w-full text-sm text-neutral-200 border-0 focus:ring-0"
                placeholder="Type prompt here..."
                required
              ></textarea>
            </div>
            <div className="flex justify-end items-center">
              <button
                type="submit"
                className="text-black font-bold bg-[#6ecfd5] hover:bg-[#60c7cc] focus:ring-4 focus:outline-none focus:ring-[#60c7cc] rounded-lg text-sm px-4 py-2 text-center numans cursor-pointer"
              >
                Ask Ollama
              </button>
            </div>
          </form>
          {finalResponse.length > 0 && (
            <div className="flex flex-row justify-center ">
              <div className="w-full mx-auto p-6 rounded-2xl shadow-xl bg-gradient-to-br from-[#6ecfd5]/80 via-[#22223b]/80 to-[#232946]/80 backdrop-blur-md border border-[#6ecfd5] mt-8 overflow-y-auto">
                <ReactMarkdown className="prose prose-invert text-2xl md:text-3xl font-semibold text-white text-center font-mono tracking-wide leading-relaxed break-words">
                  {finalResponse}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Ollama;
