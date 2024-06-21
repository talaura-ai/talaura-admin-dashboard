import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
const AI_API_URL = import.meta.env.VITE_AI_API_URL;

export interface IMessageInput {
  conversation_id: string;
  assessmentId: string;
  jdData: string;
  setJdData: any;
  assistantMessage: any;
  setAssisstantMessage: any;
  aiMessage: any;
  setAiMessage: any;
}

const JDMessageInput: React.FC<IMessageInput> = ({
  assistantMessage,
  setAssisstantMessage,
  jdData,
  conversation_id,
  assessmentId,
  aiMessage,
  setAiMessage,
}) => {
  console.log('aiMessage', aiMessage);
  const sendAIRequestForJD = async () => {
    // event.preventDefault();

    if (!assistantMessage || !assistantMessage.length) {
      toast.error('Please type message to ask to TalAura Assistant!');
      return;
    }

    const payloads = {
      changes: assistantMessage,
      jd_text: jdData,
      user_id: assessmentId,
      conversation_id,
    };
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    try {
      const response = await fetch(`${AI_API_URL}update_jd`, {
        method: 'POST',
        body: JSON.stringify(payloads),
        redirect: 'follow',
        headers: myHeaders,
      });
      const reader = response?.body?.getReader();

      const stream = async () => {
        return new ReadableStream({
          start(controller) {
            // The following function handles each data chunk
            function push() {
              // "done" is a Boolean and value a "Uint8Array"
              reader?.read().then(({ done, value }) => {
                // If there is no more data to read
                if (done) {
                  console.log('done', done);
                  controller.close();
                  return;
                }
                const string = new TextDecoder().decode(value);

                setAiMessage(string);
                // Get the data and send it to the browser via the controller
                controller.enqueue(value);
                // Check chunks by logging to the console
                console.log(done, string);
                push();
              });
            }

            push();
          },
        });
      };

      const streaming = await stream();
      console.log(streaming);
      const returnStreamResponse = async () => {
        return new Response(streaming, {
          headers: { 'Content-Type': 'text/html' },
        }).text();
      };
      const streamResult = await returnStreamResponse();
      console.log('streamResult', streamResult);

      return;

      // let decodedValue = '';
      // while (true) {
      //   if (reader) {
      //     const { done, value } = await reader?.read();

      //     if (done) {
      //     }
      //     decodedValue = decodedValue + new TextDecoder().decode(value);

      //     setAiMessage(decodedValue);
      //   }
      // }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className="absolute z-[100] w-[50vw]">
      <div>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 z-[100]"></div>
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
