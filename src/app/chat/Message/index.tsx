import { twMerge } from "tailwind-merge"
import Budget from "./Budget"

export default function MessageItem({
  content,
  sendHour,
  userData,
  type,
  userType,
  globalSelectedData,
  ...props
}: any) {
  return type === "budget" ? (
    <Budget
      content={content}
      userType={userType}
      globalSelectedData={globalSelectedData}
      sendHour={sendHour}
      userData={userData}
      type={type}
      _idPedido={props._idPedido}
      {...props}
    />
  ) : (
    <div
      className={twMerge(
        "w-full px-2 flex items-center z-[1] justify-end",
        userData.id === props.senderId ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={twMerge(
          "border w-fit max-w-[55%] flex flex-col rounded-2xl p-4 text-white items-center justify-center",
          userData.id === props.senderId
            ? "bg-azulinho justify-end rounded-br-none"
            : "bg-white text-black rounded-bl-none justify-start"
        )}
      >
        <h1>{content}</h1>
        <div
          className={twMerge("w-full text-xs flex ", userData.id === props.senderId ? "justify-end" : "justify-start")}
        >
          <h2>{sendHour.substring(0, 5)}</h2>
        </div>
      </div>
    </div>
  )
}
