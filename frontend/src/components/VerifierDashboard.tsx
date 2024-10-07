import React, { useEffect, useState } from "react";
import LoanList from './VerifierLoanList.tsx';

import { useParams } from "react-router-dom";

interface Loan {
  borrowers: number;
  activeusers: number;
  loanscount: number;
  casedisbursed: number;
}


const VerifierDashboard: React.FC = () => {

  const { officerId } = useParams<{ officerId: string }>(); // Extract officerId from the URL
  const Loans: Loan[] = [
    { borrowers: 1, activeusers:2 , loanscount: 3, casedisbursed: 24000 },
  ];
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch(`https://credit-sea-flax.vercel.app/loans/summary`);
        // console.log(response)
        if (!response.ok) {
          throw new Error('Failed to fetch loans');
        }
        
        const data = await response.json();
        // Mapping backend data to frontend format
        console.log("DATA",data)
        const updated_data = data.map(loan => ({
          borrowers: loan.borrowUserCount, // Using _id from backend as id
          activeusers: loan.activeUserCount, // Mapping loanOfficer to officer
          loanscount: loan.approvedLoanCount,
          casedisbursed: loan.totalDisbursedloanAmount
        }));
        console.log(updated_data)
        setLoans(updated_data); // Assuming the API returns an array of loans
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []); // Run effect when officerId changes
  return (
    <div className="flex h-screen">

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Main Dashboard Content */}
        <div className="p-6 bg-gray-100 flex-1 overflow-scroll">
          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <StatCard label="Loans" value={loans[0]?.loanscount.toString()}/>
            <StatCard label="Borrowers" value={loans[0]?.borrowers.toString()} />
            <StatCard label="Cash Disbursed" value={loans[0]?.casedisbursed.toString()}/>
            <StatCard label="Savings" value="450,000" />
            <StatCard label="Repaid Loans" value="30" />
            <StatCard label="Cash Received" value="1,000,000" />
          </div>

          {/* Loan List */}
          <div className="flex justify-between items-center border-b p-4 hover:bg-gray-100 transition-all duration-200">
            <div className="text-gray-700">User Recent Activity</div>
            <div className="text-gray-700">Customer Name</div>
            <div className="text-gray-700">Date</div>
            <div className="text-gray-700">Status</div>
            <div className="text-gray-700">Action</div>
          </div>
          <LoanList />
        </div>
      </div>
    </div>
  );
};

// Helper Component for Stats
interface StatCardProps {
  label: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
      <h4 className="text-lg font-semibold mb-2">{label}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default VerifierDashboard;
