import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

// Define props structure
interface LoanCardProps {
  loan: {
    id: string; // Loan ID
    officer: string;
    amount: string;
    date: string;
    status: string;
  };
  actions: boolean;
  role?: "verifier" | "admin"; // Role is optional
}

// Function to return status color based on loan status
const getStatusColor = (status: string): string => {
  switch (status) {
    case "APPROVED":
      return "bg-blue-500 text-white";
    case "PENDING":
      return "bg-yellow-500 text-white";
    case "REJECTED":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

const LoanCard: React.FC<LoanCardProps> = ({ loan, actions, role }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [status, setStatus] = useState(loan.status); // Local state for status
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false); // Close the dropdown
      }
    };

    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup the event listener when the component is unmounted
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Define actions based on role
  const actionOptions =
    role === "verifier" ? ["Verify", "Reject"] : role === "admin" ? ["Accept", "Reject"] : [];

  // Function to handle action selection and update status via API
  const handleAction = async (action: string) => {
    let updatedStatus = "";

  // Set the updated status based on the action
  switch (action) {
    case "Verify":
      updatedStatus = "VERIFIED";
      break;
    case "Reject":
      updatedStatus = "REJECTED";
      break;
    case "Accept":
      updatedStatus = "APPROVED";
      break;
    default:
      return;
  }
    try {
      if (role === "verifier") {
        // Verifier API call
        await axios.patch(`https://credit-sea-flax.vercel.app/loans/status-verifier?_id=${loan.id}`, {
          status: updatedStatus,
          loanOfficer: "Jon Okoh", // Passing loan officer as required
        });
        console.log(`Verifier updated loan ID: ${loan.id} status to ${updatedStatus}`);
      } else if (role === "admin") {
        // Admin API call
        await axios.patch(`https://credit-sea-flax.vercel.app/loans/status-admin?_id=${loan.id}`, {
          status: updatedStatus,
          
        });
        console.log(`Admin updated loan ID: ${loan.id} status to ${updatedStatus}`);
      }

      // Update the local status immediately after a successful API call
      setStatus(updatedStatus);
    } catch (error) {
      console.error("Error updating loan status", error);
    }
  };

  return (
    <div className="flex justify-between items-center border-b p-4 transition-all duration-200 relative">
      <div className="flex items-center">
        <img
          src={`https://i.pravatar.cc/40?u=${loan.officer}`}
          alt={loan.officer}
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <h3 className="text-md  font-medium">{loan.officer}</h3>
          <p className="text-sm text-gray-500">Updated 1 day ago</p>
        </div>
      </div>
      <div className="text-gray-700">{loan.amount}</div>
      <div className="text-gray-500">{loan.date}</div>
      <span className={`px-4 py-2 rounded-full ${getStatusColor(status)}`}>
        {status}
      </span>

      {/* Conditionally render action button only if actions is true and role is provided */}
      {actions && role && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="ml-4 w-10 h-10 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-300 focus:outline-none"
          >
            &#x22EE; {/* Vertical three dots */}
          </button>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 z-10 bg-white shadow-md rounded-md w-40">
              {actionOptions.map((action) => (
                <li
                  key={action}
                  onClick={() => handleAction(action)}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                >
                  {action}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default LoanCard;
