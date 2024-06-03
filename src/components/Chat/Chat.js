import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Chat() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubscribe;
  }, []);

  const SignOut = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const sendMessage = async () => {
    await addDoc(collection(db, "messages"), {
      uid: user?.uid,
      photoUrl: user?.photoURL,
      displayName: user?.displayName,
      text: newMessage,
      timestamp: serverTimestamp(),
    });
    setNewMessage("");
  };


  return (
    <div className="h-[100vh] bg-[#373843]">
      <div className="p-10">
        <div className="h-[600px] flex flex-col gap-4 overflow-scroll mb-6 p-4">
          {messages?.map((msg) => (
            <>
              <div key={msg?.id} className={`${styles.message} ${msg.data.uid === user?.uid ? styles.user : styles.other}`}>
              <p className="text-[#fff] text-[8px]">
                {new Date(msg?.data?.timestamp?.toDate()).toLocaleString()}
              </p>
                <p className="text-[8px]">{msg.data.displayName}</p>
                <p>{msg?.data?.text}</p>
                {msg?.data?.photoUrl ? (
                  <img src={msg?.data?.photoUrl} alt="user" />
                ) : (
                  <AccountCircleIcon
                    sx={{ position: "absolute", right: -12, bottom: -12 }}
                  />
                )}
              </div>
            </>
          ))}
        </div>
        <div className="w-full flex justify-center">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className={styles.input}
            type="text"
            placeholder="Type your message"
          />
          <button onClick={sendMessage} className={styles.btn}>
            <ArrowDropUpIcon />
          </button>
        </div>
        <button className={styles.OutBtn} onClick={SignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Chat;
