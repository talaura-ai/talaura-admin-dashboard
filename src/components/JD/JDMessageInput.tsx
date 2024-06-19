import { Textarea } from "@headlessui/react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import toast from "react-hot-toast";
const AI_API_URL = import.meta.env.VITE_AI_API_URL;

export interface IMessageInput {
  conversation_id: string;
  assessmentId: string;
  jdData: string;
  setJdData: any;
}

const JDMessageInput: React.FC<IMessageInput> = ({
  conversation_id,
  assessmentId,
  jdData,
  setJdData,
}) => {
  const [assistantMessage, setAssisstantMessage] = useState("");
  const [aiMessage, setAiMessage] = useState("");

  const sendAIRequestForJD = async () => {
    // event.preventDefault();

    if (!assistantMessage || !assistantMessage.length) {
      toast.error("Please type message to ask to TalAura Assistant!");
      return;
    }

    const payloads = {
      changes:
        "Add requirements for strong problem-solving skills and experience with cloud technologies. Update the salary range to reflect current market standards.",
      jd_text:
        "We are seeking a software engineer with 5+ years of experience in developing web applications. The candidate should have proficiency in JavaScript, HTML, CSS, and experience with frontend frameworks like React or Angular. Responsibilities include designing user interfaces, optimizing web performance, and collaborating with cross-functional teams.",
      user_id: "user123",
      conversation_id: "conversation456",
    };
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    try {
      const response = await fetch(`${AI_API_URL}update_jd`, {
        method: "POST",
        body: JSON.stringify(payloads),
        redirect: "follow",
        headers: myHeaders,
      });

      const reader = response.body.getReader();

      let decodedValue = "";
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
        }
        decodedValue = decodedValue + new TextDecoder().decode(value);

        setAiMessage(decodedValue);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <div>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
          {/* <Textarea value={aiMessage}></Textarea> */}
          <input
            type="text"
            name="message"
            id="message"
            className="block w-full rounded-md border-0 py-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-color sm:text-sm sm:leading-6"
            placeholder="Message TalAura Assistent..."
            value={assistantMessage}
            onChange={(e) => setAssisstantMessage(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="currency" className="sr-only">
              Send
            </label>
            <button
              id="currency"
              name="currency"
              onClick={() => sendAIRequestForJD()}
              className="h-full rounded-md border-0  py-0 px-5  text-gray-500 focus:ring-0 focus:ring-inset focus:ring-brand-color sm:text-sm"
            >
              <ArrowUpCircleIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JDMessageInput;
