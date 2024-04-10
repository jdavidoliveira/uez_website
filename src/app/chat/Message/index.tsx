import { twMerge } from "tailwind-merge"
import Budget from "./Budget"
import { IMessage } from "@/types/IChat"
import { User } from "next-auth"

interface MessageItemProps {
  userData: User
  type: "TEXT" | "IMAGE" | "BUDGET" | "URL"
  userType: "UZER" | "CLIENTE"
  message: IMessage
}

export default function MessageItem({ userData, type, userType, message }: MessageItemProps) {
  return type === "BUDGET" ? (
    <Budget message={message} userType={userType} userData={userData} type={type} />
  ) : (
    <div
      className={twMerge(
        "w-full px-2 flex items-center z-[1] justify-end",
        userData.id === message.senderId ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={twMerge(
          "border w-fit max-w-[55%] flex flex-col rounded-2xl p-4 text-white items-center justify-center",
          userData.id === message.senderId
            ? "bg-azulinho justify-end rounded-br-none"
            : "bg-white text-black rounded-bl-none justify-start"
        )}
      >
        <h1 className="w-full flex items-center justify-end">{message.content}</h1>
        <div
          className={twMerge(
            "w-full text-xs flex ",
            userData.id === message.senderId ? "justify-end" : "justify-start"
          )}
        >
          <h2>
            {message.createdAt.substring(11, 16)}
            {userData.id === message.senderId ? (message.readed ? " - L" : " - NL") : ""}
          </h2>
        </div>
      </div>
    </div>
  )
}
