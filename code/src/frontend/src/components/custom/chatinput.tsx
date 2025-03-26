import { Textarea } from "../ui/textarea";
import { cx } from "classix";
import { Button } from "../ui/button";
import { ArrowUpIcon } from "./icons";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";

interface ChatInputProps {
  question: string;
  setQuestion: (question: string) => void;
  onSubmit: (text?: string) => void;
  isLoading: boolean;
}

const suggestedActions = [
  {
    title: "Give my recent transactions",
    label: "Transactions",
    action: "Show me my recent transactions",
  },
  {
    title: "Suggest me some investment options",
    label: "Investments",
    action: "Tell me an interesting fact about investments",
  },
];

export const ChatInput = ({
  question,
  setQuestion,
  onSubmit,
  isLoading,
}: ChatInputProps) => {
  const { text, startListening, stopListening } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Update the question input with recognized text
  useEffect(() => {
    setQuestion(text);
  }, [text]);

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
    setIsListening(!isListening);
  };

  return (
    <div className="relative w-full flex flex-col gap-4">
      {showSuggestions && (
        <div className="hidden md:grid sm:grid-cols-2 gap-2 w-full">
          {suggestedActions.map((suggestedAction, index) => (
            <Button
              key={index}
              variant="ghost"
              onClick={() => {
                const text = suggestedAction.action;
                onSubmit(text);
                setShowSuggestions(false);
              }}
              className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
            >
              <span className="font-medium">{suggestedAction.title}</span>
              <span className="text-muted-foreground">
                {suggestedAction.label}
              </span>
            </Button>
          ))}
        </div>
      )}

      <div className="flex items-center">
        <Button
          onClick={handleToggleListening}
          className={cx(
            "rounded-full p-3 border dark:border-zinc-600 mr-2 transition-all duration-300",
            isListening
              ? "bg-red-500 text-white"
              : "bg-muted hover:bg-blue-500 hover:text-white"
          )}
        >
          <svg
            className={cx(
              "h-6 w-6 transition-transform duration-300",
              isListening ? "animate-pulse fill-white" : "fill-black"
            )}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12 2a3 3 0 00-3 3v6a3 3 0 006 0V5a3 3 0 00-3-3zm-5 9a5 5 0 1010 0V5a5 5 0 10-10 0v6zm11 0a6.978 6.978 0 01-3 5.657V20h2a1 1 0 110 2h-6a1 1 0 110-2h2v-3.343A6.978 6.978 0 016 11V5a7 7 0 1114 0v6z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
        <Textarea
          placeholder="Send a message..."
          className={cx(
            "min-h-[24px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-xl text-base bg-muted flex-grow"
          )}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();

              if (isLoading) {
                toast.error(
                  "Please wait for the model to finish its response!"
                );
              } else {
                setShowSuggestions(false);
                onSubmit();
              }
            }
          }}
          rows={3}
          autoFocus
        />
      </div>

      <Button
        className="rounded-full p-1.5 h-fit absolute bottom-2 right-2 m-0.5 border dark:border-zinc-600"
        onClick={() => onSubmit(question)}
        disabled={question.length === 0}
      >
        <ArrowUpIcon size={14} />
      </Button>
    </div>
  );
};
