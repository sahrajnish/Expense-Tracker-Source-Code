import React from "react";
import { Progress } from "antd";

const Chart = ({ allExpenses }) => {
  const totalTransaction = allExpenses.length;
  const totalIncome = allExpenses.filter((e) => e.type === "income");
  const totalExpenditure = allExpenses.filter((e) => e.type === "expense");

  const totalIncomePercent = (totalIncome.length / totalTransaction) * 100;
  const totalExpenditurePercent =
    (totalExpenditure.length / totalTransaction) * 100;

  const totalTurnOver = allExpenses.reduce(
    (acc, e) => acc + Number(e.amount),
    0
  );
  const totalIncomeTurnOver = totalIncome.reduce(
    (acc, e) => acc + Number(e.amount),
    0
  );
  const totalExpenditureTurnOver = totalExpenditure.reduce(
    (acc, e) => acc + Number(e.amount),
    0
  );

  const incomeTurnOverPercent =
    (totalIncomeTurnOver / totalTurnOver) * 100 || 0;
  const expenditureTurnOverPercent =
    (totalExpenditureTurnOver / totalTurnOver) * 100 || 0;

  const categories = [
    "salary",
    "tip",
    "project",
    "food",
    "movie",
    "rent",
    "bills",
    "medical",
    "fees",
    "tax",
    "others",
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 px-4">
      {/* Transaction Count */}
      <div className="w-full sm:w-1/2 md:w-1/3">
        <div className="bg-white rounded-lg shadow-md border">
          <div className="bg-gray-100 px-4 py-2 border-b font-semibold text-gray-700">
            Total Transactions: {totalTransaction}
          </div>
          <div className="p-4 space-y-2">
            <h5 className="text-green-600 font-medium">
              Income: {totalIncome.length}
            </h5>
            <h5 className="text-red-600 font-medium">
              Expense: {totalExpenditure.length}
            </h5>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <div className="flex flex-col items-center">
                <Progress
                  type="circle"
                  strokeColor="green"
                  percent={Number(totalIncomePercent.toFixed(0))}
                />
                <span className="mt-2 text-sm text-green-700 font-medium">
                  Income
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Progress
                  type="circle"
                  strokeColor="red"
                  percent={Number(totalExpenditurePercent.toFixed(0))}
                />
                <span className="mt-2 text-sm text-red-700 font-medium">
                  Expense
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Turnover */}
      <div className="w-full sm:w-1/2 md:w-1/3">
        <div className="bg-white rounded-lg shadow-md border">
          <div className="bg-gray-100 px-4 py-2 border-b font-semibold text-gray-700">
            Total Turnover: ₹{totalTurnOver}
          </div>
          <div className="p-4 space-y-2">
            <h5 className="text-green-600 font-medium">
              Income: ₹{totalIncomeTurnOver}
            </h5>
            <h5 className="text-red-600 font-medium">
              Expense: ₹{totalExpenditureTurnOver}
            </h5>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <div className="flex flex-col items-center">
                <Progress
                  type="circle"
                  strokeColor="green"
                  percent={Number(incomeTurnOverPercent.toFixed(0))}
                />
                <span className="mt-2 text-sm text-green-700 font-medium">
                  Income
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Progress
                  type="circle"
                  strokeColor="red"
                  percent={Number(expenditureTurnOverPercent.toFixed(0))}
                />
                <span className="mt-2 text-sm text-red-700 font-medium">
                  Expense
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category-wise Income */}
      <div className="w-full sm:w-1/2 md:w-1/3">
        <div className="bg-white rounded-lg shadow-md border p-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Income</h4>
          {categories.map((category) => {
            const amount = totalIncome
              .filter((e) => e.category === category)
              .reduce((acc, e) => acc + Number(e.amount), 0);

            if (amount > 0 && totalIncomeTurnOver > 0) {
              return (
                <div
                  key={`income-${category}`}
                  className="bg-gray-50 rounded shadow-sm border p-4 mb-4"
                >
                  <h5 className="text-base font-medium text-gray-700 mb-2">
                    {category}
                  </h5>
                  <Progress
                    strokeColor="green"
                    percent={((amount / totalIncomeTurnOver) * 100).toFixed(0)}
                  />
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>

      {/* Category-wise Expense */}
      <div className="w-full sm:w-1/2 md:w-1/3">
        <div className="bg-white rounded-lg shadow-md border p-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Expense</h4>
          {categories.map((category) => {
            const amount = totalExpenditure
              .filter((e) => e.category === category)
              .reduce((acc, e) => acc + Number(e.amount), 0);

            if (amount > 0 && totalExpenditureTurnOver > 0) {
              return (
                <div
                  key={`expense-${category}`}
                  className="bg-gray-50 rounded shadow-sm border p-4 mb-4"
                >
                  <h5 className="text-base font-medium text-gray-700 mb-2">
                    {category}
                  </h5>
                  <Progress
                    strokeColor="red"
                    percent={((amount / totalExpenditureTurnOver) * 100).toFixed(0)}
                  />
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Chart;
