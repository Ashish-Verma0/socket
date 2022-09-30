import React from 'react'
import "../message/Message.css"
const Message = ({message,classs,user}) => {
    if(user){
        return (
            <div className={`messageBox ${classs}`}>
                {`${user}:${message}`}
            </div>
          )
    }else{
        return (
          <div className={`messageBox ${classs}`}>
            {`You:${message}`}
          </div>
        )
    }
}

export default Message