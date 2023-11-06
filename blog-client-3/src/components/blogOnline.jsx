import { useState, useEffect } from "react";

export function BlogOnline() {
    const [isOnline, setOnlineStatus] = useState(true);
    
    useEffect(() => {
        const setFromEvent = function(event) {
            if(event.type === 'online') {
                setOnlineStatus(true);
            }
            else if(event.type === 'offline') {
                setOnlineStatus(false);
            }
            
        }

        window.addEventListener("online", setFromEvent);
        window.addEventListener("offline", setFromEvent);
        
        return() => {
            window.removeEventListener("online", setFromEvent);
            window.removeEventListener("offline", setFromEvent);
        }
    });

    return isOnline
}