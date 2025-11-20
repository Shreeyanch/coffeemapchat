// import React, { useState, useEffect, useRef } from "react";
// import { Send } from "lucide-react";

// export default function CoffeeMapChat() {
//   const [stage, setStage] = useState(0);
//   const [formData, setFormData] = useState({
//     cafeName: "",
//     contact: "",
//   });
//   const [showForm, setShowForm] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [stage, showForm]);

//   useEffect(() => {
//     const timers = [];

//     if (stage === 0) {
//       timers.push(setTimeout(() => setStage(1), 800));
//     } else if (stage === 1) {
//       timers.push(setTimeout(() => setStage(2), 1500));
//     } else if (stage === 2) {
//       timers.push(setTimeout(() => setStage(3), 1000));
//     } else if (stage === 3) {
//       timers.push(setTimeout(() => setStage(4), 1200));
//     } else if (stage === 4) {
//       timers.push(
//         setTimeout(() => {
//           setShowForm(true);
//           setStage(5);
//         }, 800)
//       );
//     }

//     return () => timers.forEach((timer) => clearTimeout(timer));
//   }, [stage]);

//   const handleSubmit = async () => {
//     if (!formData.cafeName || !formData.contact) {
//       alert("Please fill in both fields");
//       return;
//     }

//     setStage(6);

//     try {
//       const res = await fetch("https://coffeemapchat-a2wu.vercel.app/api/cafes", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to submit");
//       }

//       console.log("Submitted:", formData);
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong");
//     }

//     // Reset form
//     setTimeout(() => {
//       setFormData({
//         cafeName: "",
//         contact: "",
//       });
//     }, 2000);
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Messages Container */}
//       <div className="max-w-2xl mx-auto px-4 py-8">
//         {stage >= 1 && (
//           <div className="flex gap-3 mb-3 animate-fade-in">
//             <div className="bg-gray-200 rounded-3xl rounded-tl-md px-5 py-3 max-w-[75%]">
//               <div className="w-30 h-30 rounded-2xl overflow-hidden mb-3">
//                 <img
//                   src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
//                   alt="Ananya"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <p className="text-gray-900 text-base leading-relaxed">
//                 heyyyy, my name is ananya. i am a ☕️ coffee nerd and i'm
//                 creating a physical coffee map of kathmandu with all the best
//                 cafes! the maps will be placed in cafes around the city so
//                 everyone can discover amazing coffee spots!
//               </p>
//             </div>
//           </div>
//         )}

//         {stage >= 2 && (
//           <div className="flex gap-3 mb-3 justify-end animate-fade-in">
//             <div className="bg-blue-500 rounded-3xl rounded-tr-md px-5 py-3 max-w-[75%]">
//               <p className="text-white text-base">awesome!</p>
//             </div>
//           </div>
//         )}

//         {stage >= 3 && (
//           <div className="flex gap-3 mb-3 justify-end animate-fade-in">
//             <div className="bg-blue-500 rounded-3xl rounded-tr-md px-5 py-3 max-w-[75%]">
//               <p className="text-white text-base">now tell me!</p>
//             </div>
//           </div>
//         )}

//         {stage >= 4 && (
//           <div className="flex gap-3 mb-3 animate-fade-in">
//             <div className="bg-gray-200 rounded-3xl rounded-tl-md px-5 py-3 max-w-[75%]">
//               <p className="text-gray-900 text-base leading-relaxed">
//                 if you want your cafe to be in the map just give me the details
//               </p>
//             </div>
//           </div>
//         )}

//         {stage >= 5 && (
//           <div className="flex gap-3 mb-3 justify-end animate-fade-in">
//             <div className="bg-blue-500 rounded-3xl rounded-tr-md px-5 py-3 max-w-[75%]">
//               <p className="text-white text-base mb-4">sure!</p>

//               {showForm && (
//                 <div className="space-y-3">
//                   <input
//                     type="text"
//                     name="cafeName"
//                     placeholder="Cafe Name"
//                     value={formData.cafeName}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 rounded-xl text-base text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                   <input
//                     type="tel"
//                     name="contact"
//                     placeholder="Contact Number"
//                     value={formData.contact}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 rounded-xl text-base text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                   <button
//                     onClick={handleSubmit}
//                     className="w-full bg-white text-blue-500 font-semibold py-3 rounded-xl text-base hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
//                   >
//                     <Send size={18} />
//                     Submit
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {stage >= 6 && (
//           <div className="flex gap-3 mb-3 animate-fade-in">
//             <div className="bg-gray-200 rounded-3xl rounded-tl-md px-5 py-3 max-w-[75%]">
//               <p className="text-gray-900 text-base leading-relaxed">
//                 looks good! will give you a call once it's done ☕️✨
//               </p>
//             </div>
//           </div>
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       <div className="fixed bottom-8 left-0 right-0 text-center text-sm text-gray-400">
//         <p>powered by samparka</p>
//       </div>

//       <style>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in {
//           animation: fade-in 0.4s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { Send, Mail, Instagram } from "lucide-react";

export default function CoffeeMapChat() {
  const [stage, setStage] = useState(0);
  const [formData, setFormData] = useState({
    cafeName: "",
    contact: "",
  });
  const [showForm, setShowForm] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [stage, showForm]);

  useEffect(() => {
    const timers = [];

    if (stage === 0) timers.push(setTimeout(() => setStage(1), 800));
    else if (stage === 1) timers.push(setTimeout(() => setStage(2), 1500));
    else if (stage === 2) timers.push(setTimeout(() => setStage(3), 1000));
    else if (stage === 3) timers.push(setTimeout(() => setStage(4), 1200));
    else if (stage === 4)
      timers.push(
        setTimeout(() => {
          setShowForm(true);
          setStage(5);
        }, 800)
      );

    return () => timers.forEach((t) => clearTimeout(t));
  }, [stage]);

  const handleSubmit = async () => {
    if (!formData.cafeName || !formData.contact) {
      alert("Please fill in both fields");
      return;
    }

    setStage(6);

    try {
      const res = await fetch(
        "https://coffeemapchat-a2wu.vercel.app/api/cafes",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to submit");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

    setTimeout(() => {
      setFormData({ cafeName: "", contact: "" });
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/f2/a2/7f/f2a27f5c5e31eff4e156d7939be157cd.jpg')",
      }}
    >
      {/* <div className=" h-screen w-full z-0 fixed top-0 left-0 right-0 overflow-hidden">
        <img src="https://i.pinimg.com/736x/f2/a2/7f/f2a27f5c5e31eff4e156d7939be157cd.jpg" />
      </div> */}

      {/* Top Black Pill */}
      <div className="w-full flex justify-center pt-6 px-4">
        <div className="bg-black/70 backdrop-blur-md text-white flex items-center justify-between w-full max-w-md rounded-full py-3 px-5 shadow-lg">
          {/* Left side: profile img + name */}
          <div className="flex items-center gap-3">
            <img
              src="https://i.pinimg.com/1200x/f3/2b/b4/f32bb4054ab4137444a3a2b5a0fb0c35.jpg"
              className="w-10 h-10 rounded-full object-cover"
              alt="Profile"
            />
            <div>
              <p className="text-sm font-semibold">samparka.loyalty</p>
              <p className="text-xs text-gray-300">hello.samparka.info</p>
            </div>
          </div>

          {/* Right side: icons */}
          <div className="flex items-center gap-4">
            <Mail size={20} className="text-white" />
            <Instagram size={20} className="text-white" />
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="max-w-2xl mx-auto px-4 py-20">
        {stage >= 1 && (
          <div className="flex gap-3 mb-3 animate-fade-in">
            <div className="bg-white/80 rounded-3xl rounded-tl-md px-5 py-3 max-w-[75%] backdrop-blur-sm">
              <div className="w-30 h-30 rounded-2xl overflow-hidden mb-3">
                <img
                  src="https://i.pinimg.com/736x/02/68/25/026825feef776a789be0ce55a9f93022.jpg"
                  alt="Ananya"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-gray-900 text-base leading-relaxed">
                heyyyy! I’m Yullah a ☕️ coffee nerd on a mission. I’m
                creating a physical coffee map of Kathmandu featuring the city’s
                best cafes and hidden gems. These maps will be placed in cafés
                all around Kathmandu so everyone can easily discover amazing
                coffee spots and support the local coffee community
              </p>
            </div>
          </div>
        )}

        {stage >= 2 && (
          <div className="flex gap-3 mb-3 justify-end animate-fade-in">
            <div className="bg-blue-500 rounded-3xl rounded-tr-md px-5 py-3 max-w-[75%] text-white">
              awesome!
            </div>
          </div>
        )}

        {stage >= 3 && (
          <div className="flex gap-3 mb-3 justify-end animate-fade-in">
            <div className="bg-blue-500 rounded-3xl rounded-tr-md px-5 py-3 max-w-[75%] text-white">
              now tell me!
            </div>
          </div>
        )}

        {stage >= 4 && (
          <div className="flex gap-3 mb-3 animate-fade-in">
            <div className="bg-white/80 rounded-3xl rounded-tl-md px-5 py-3 max-w-[75%] backdrop-blur-sm text-gray-900">
              if you want your cafe to be in the map just give me the details
            </div>
          </div>
        )}

        {stage >= 5 && (
          <div className="flex gap-3 mb-3 justify-end animate-fade-in">
            <div className="bg-blue-500 rounded-3xl rounded-tr-md px-5 py-3 max-w-[75%] text-white">
              <p className="mb-4">sure!</p>

              {showForm && (
                <div className="space-y-3">
                  <input
                    type="text"
                    name="cafeName"
                    placeholder="Cafe Name"
                    value={formData.cafeName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl text-base text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="tel"
                    name="contact"
                    placeholder="Contact Number"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl text-base text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-white text-blue-500 font-semibold py-3 rounded-xl text-base hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={18} /> Submit
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {stage >= 6 && (
          <div className="flex gap-3 mb-3 animate-fade-in">
            <div className="bg-white/80 rounded-3xl rounded-tl-md px-5 py-3 max-w-[75%] backdrop-blur-sm text-gray-900">
              looks good! will give you a call once it's done ☕️✨
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="fixed bottom-8 left-0 right-0 text-center text-sm text-white drop-shadow-lg">
        powered by samparka
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}

