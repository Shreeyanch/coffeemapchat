import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";

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

    if (stage === 0) {
      timers.push(setTimeout(() => setStage(1), 800));
    } else if (stage === 1) {
      timers.push(setTimeout(() => setStage(2), 1500));
    } else if (stage === 2) {
      timers.push(setTimeout(() => setStage(3), 1000));
    } else if (stage === 3) {
      timers.push(setTimeout(() => setStage(4), 1200));
    } else if (stage === 4) {
      timers.push(
        setTimeout(() => {
          setShowForm(true);
          setStage(5);
        }, 800)
      );
    }

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [stage]);

  const handleSubmit = async () => {
    if (!formData.cafeName || !formData.contact) {
      alert("Please fill in both fields");
      return;
    }

    setStage(6);

    try {
      const res = await fetch("https://coffeemapchat-a2wu-mg0fs8q4z-shreeyanchs-projects.vercel.app/api/cafes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      console.log("Submitted:", formData);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

    // Reset form
    setTimeout(() => {
      setFormData({
        cafeName: "",
        contact: "",
      });
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Messages Container */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {stage >= 1 && (
          <div className="flex gap-3 mb-3 animate-fade-in">
            <div className="bg-gray-200 rounded-3xl rounded-tl-md px-5 py-3 max-w-[75%]">
              <div className="w-30 h-30 rounded-2xl overflow-hidden mb-3">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
                  alt="Ananya"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-gray-900 text-base leading-relaxed">
                heyyyy, my name is ananya. i am a ☕️ coffee nerd and i'm
                creating a physical coffee map of kathmandu with all the best
                cafes! the maps will be placed in cafes around the city so
                everyone can discover amazing coffee spots!
              </p>
            </div>
          </div>
        )}

        {stage >= 2 && (
          <div className="flex gap-3 mb-3 justify-end animate-fade-in">
            <div className="bg-blue-500 rounded-3xl rounded-tr-md px-5 py-3 max-w-[75%]">
              <p className="text-white text-base">awesome!</p>
            </div>
          </div>
        )}

        {stage >= 3 && (
          <div className="flex gap-3 mb-3 justify-end animate-fade-in">
            <div className="bg-blue-500 rounded-3xl rounded-tr-md px-5 py-3 max-w-[75%]">
              <p className="text-white text-base">now tell me!</p>
            </div>
          </div>
        )}

        {stage >= 4 && (
          <div className="flex gap-3 mb-3 animate-fade-in">
            <div className="bg-gray-200 rounded-3xl rounded-tl-md px-5 py-3 max-w-[75%]">
              <p className="text-gray-900 text-base leading-relaxed">
                if you want your cafe to be in the map just give me the details
              </p>
            </div>
          </div>
        )}

        {stage >= 5 && (
          <div className="flex gap-3 mb-3 justify-end animate-fade-in">
            <div className="bg-blue-500 rounded-3xl rounded-tr-md px-5 py-3 max-w-[75%]">
              <p className="text-white text-base mb-4">sure!</p>

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
                    <Send size={18} />
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {stage >= 6 && (
          <div className="flex gap-3 mb-3 animate-fade-in">
            <div className="bg-gray-200 rounded-3xl rounded-tl-md px-5 py-3 max-w-[75%]">
              <p className="text-gray-900 text-base leading-relaxed">
                looks good! will give you a call once it's done ☕️✨
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="fixed bottom-8 left-0 right-0 text-center text-sm text-gray-400">
        <p>powered by samparka</p>
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
