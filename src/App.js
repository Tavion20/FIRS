import { useRef, useState } from "react";
import "./App.css";
import Records from "./Python/data.json";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
// Fixed Version
function App() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [regusername, setRegUsername] = useState(null);
  const [regpassword, setRegPassword] = useState(null);
  const inputRef = useRef(null);
  const [image, setimg] = useState("");
  const [show, setShow] = useState(false);
  const [login, setLogin] = useState(false);
  const [signOut, setSignOut] = useState(false);
  const [finalRes, setFinalRes] = useState("");
  let final_res="";
  const handleImageClick = () => {
    inputRef.current.click();
  };
  const handleImageChange = (event) => {
    setShow(false);
    const file = event.target.files[0];
    setimg(file);

    const formData = new FormData();
    formData.append("myFile", file);

    fetch("http://localhost:10000/runmodel", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(data => {      
      for (let w=2;data['result'][w]!="'";w++){
        if(w==2){
          final_res+=data['result'][w];
          final_res=final_res.toUpperCase();
        }
        else{
          if(data['result'][w]=='_')
          {
            final_res+=' ';
          }
          else if(data['result'][w-1]=='_'){
            let up= data['result'][w];
            up=up.toUpperCase();
            final_res+=up;
          }
          else{
            final_res+=data['result'][w];
          }
        }
      }
      
      console.log(final_res);
      setFinalRes(final_res);

    })
    .catch(err => console.log(err))
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(username);
    console.log(password);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setLogin(true);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  function handleRegisterSubmit(event) {
    event.preventDefault();
    console.log(regusername);
    console.log(regpassword);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, regusername, regpassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setLogin(true);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
  const handleSignout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setSignOut(true);
        setLogin(false);
      })
      .catch((error) => {
        // An error happened
      });
  };

  return (
    <div className="App">
      <div style={{ padding: "1rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          <b>F</b>ood <b>I</b>mage <b>R</b>ecognition <b>S</b>ystem
        </div>

        {!login && (
          <div>
            <div
              style={{
                backgroundColor: "black",
                opacity: "50%",
                borderRadius: "2rem",
                padding: "1rem",
                marginTop: "1rem",
              }}
            >
              <div
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "0.5rem",
                  color: "white",
                }}
              >
                <u>Login</u>
              </div>
              <div>
                <div
                  style={{
                    color: "white",
                    marginTop: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  Username
                </div>
                <input
                  type="text"
                  placeholder="Please enter Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ width: "20rem", height: "1.5rem" }}
                />
                <div
                  style={{
                    color: "white",
                    marginTop: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  Password
                </div>
                <input
                  type="password"
                  placeholder="Please enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: "20rem", height: "1.5rem" }}
                />
                <div>
                  <button
                    onClick={handleSubmit}
                    style={{
                      backgroundColor: "cyan",
                      width: "5rem",
                      height: "2rem",
                      borderRadius: "3rem",
                      borderWidth: "0.05rem",
                      cursor: "pointer",
                      fontWeight: 700,
                      fontSize: "1rem",
                      marginTop: "1rem",
                    }}
                  >
                    Sign In
                  </button>
                </div>
              </div>
              <div
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "0.5rem",
                  color: "white",
                }}
              >
                --------------------------------------------------------------------
              </div>
              <div
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "0.5rem",
                  color: "white",
                }}
              >
                <u>Register</u>
              </div>
              <div>
                <div
                  style={{
                    color: "white",
                    marginTop: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  Username
                </div>
                <input
                  type="text"
                  placeholder="Please enter Email"
                  value={regusername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  style={{ width: "20rem", height: "1.5rem" }}
                />
                <div
                  style={{
                    color: "white",
                    marginTop: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  Password
                </div>
                <input
                  type="password"
                  placeholder="Please enter Password"
                  value={regpassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  style={{ width: "20rem", height: "1.5rem" }}
                />
                <div>
                  <button
                    onClick={handleRegisterSubmit}
                    style={{
                      backgroundColor: "cyan",
                      width: "5rem",
                      height: "2rem",
                      borderRadius: "3rem",
                      borderWidth: "0.05rem",
                      cursor: "pointer",
                      fontWeight: 700,
                      fontSize: "1rem",
                      marginTop: "1rem",
                    }}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {login && (
          <div>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
              Choose an Image
            </div>
            <div
              style={{ display: "flex", justifyContent: "center" }}
              onClick={handleImageClick}
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  style={{ height: "30rem", width: "50rem" }}
                />
              ) : (
                <img
                  src="./imgdefault.png"
                  style={{ height: "30rem", width: "30rem" }}
                />
              )}
              <input
                type="file"
                ref={inputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
            <div>
              <button
                style={{
                  backgroundColor: "cyan",
                  width: "9rem",
                  height: "3rem",
                  borderRadius: "3rem",
                  borderWidth: "0.05rem",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "1rem",
                  marginTop: "1rem",
                }}
                onClick={() => setShow(true)}
              >
                Detect
              </button>
            </div>
          </div>
        )}

        {show && (
          <div
            style={{
              backgroundColor: "black",
              opacity: "50%",
              borderRadius: "2rem",
              padding: "1rem",
              marginTop: "1rem",
            }}
          >
            <div
              style={{
                fontSize: "1.5rem",
                marginBottom: "0.5rem",
                color: "white",
              }}
            >
              <u>Result</u>
            </div>
            <div>
              {Records.map((records) => {
                if (records.Food == finalRes) {
                  console.log(records.Food);
                  console.log(records.Serving);
                  console.log(records.Calories);
                  return (
                    <div>
                      <div
                        style={{
                          fontSize: "1rem",
                          marginBottom: "0.5rem",
                          color: "white",
                        }}
                      >
                        Food: {records.Food}
                      </div>
                      <div
                        style={{
                          fontSize: "1rem",
                          marginBottom: "0.5rem",
                          color: "white",
                        }}
                      >
                        Serving Size: {records.Serving}
                      </div>
                      <div
                        style={{
                          fontSize: "1rem",
                          marginBottom: "0.5rem",
                          color: "white",
                        }}
                      >
                        Calories: {records.Calories}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div
              style={{
                fontSize: "1.5rem",
                marginBottom: "0.5rem",
                color: "white",
              }}
            >
              --------------------------------------------------------------------
            </div>
            <div
              style={{
                fontSize: "1.5rem",
                marginBottom: "0.5rem",
                color: "white",
              }}
            >
              <u>Review</u>
            </div>
            <div>
              <div
                style={{
                  color: "white",
                  marginTop: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                Name
              </div>
              <input
                type="text"
                placeholder="Please enter Full Name"
                style={{ width: "20rem", height: "1.5rem" }}
              />
              <div
                style={{
                  color: "white",
                  marginTop: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                Feedback
              </div>
              <textarea
                placeholder="Please provide feedback to help us improve"
                style={{ width: "20rem", height: "5.5rem", resize: "none" }}
              />
              <div
                style={{
                  color: "white",
                  marginTop: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                Accuracy Of Clossness
              </div>
              <input type="number" placeholder="0" max={100} />
              <div>
                <button
                  style={{
                    backgroundColor: "cyan",
                    width: "5rem",
                    height: "2rem",
                    borderRadius: "3rem",
                    borderWidth: "0.05rem",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: "1rem",
                    marginTop: "1rem",
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
