import React, { useState, useEffect } from "react";
import axios from "axios";
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Select, Table, DatePicker } from "antd";
import Layout from "../components/Layout/Layout.jsx";
import moment from "moment";
import Chart from "../components/Layout/Chart.jsx";

const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [allExpenses, setAllExpenses] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  const [form] = Form.useForm();

  // handle form submit
  const handlleSubmit = async (values) => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      setSaving(true);
      if(editable) {
        await axios.patch(`/api/v1/userExpenses/expenses/${editable._id}`, {
          payload: {
            ...values,
            user: loggedInUser.user.id,
          },
          transaction_id: editable._id
        });
        getAllExpenses();
        setSaving(false);
        form.resetFields();
      } else {
        await axios.post("/api/v1/userExpenses/expenses", {
          ...values,
          user: loggedInUser.user.id,
        });
        getAllExpenses();
        setSaving(false);
      };
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setSaving(false);
      console.error("Error saving expense:", error);
    }
  };

  // handle delete;
  const handleDelete = async (record) => {
    try {
      console.log(record)
      setSaving(true)
      await axios.delete(`/api/v1/userExpenses/expenses/${record._id}`)
      getAllExpenses()
      console.log("Entry deleted successfully");
    } catch (error) {
      setSaving(false);
      console.log("Handle Delete error: ", error)
    }
  }

  const getAllExpenses = async () => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post("/api/v1/userExpenses/allExpenses", {
        user: loggedInUser.user.id,
        frequency,
        selectedDate,
        type,
      });
      setAllExpenses(res.data);
    } catch (error) {
      console.error("All expense error:", error);
    }
  };

  // fetch expenses
  useEffect(() => {
    getAllExpenses();
  }, [frequency, selectedDate, type]);

  // table columns
  const column = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined onClick={() => {
            setEditable(record);
            form.setFieldsValue({
              ...record,
              date: moment(record.date), // make sure date is moment object
            });
            setShowModal(true);
          }}/>
          <DeleteOutlined className="mx-2" onClick={() => handleDelete(record)}/>
        </div>
      )
    },
  ];

  // hook to reset form
  useEffect(() => {
    if (!editable && showModal) {
      form.resetFields();
    }
  }, [editable, showModal, form]);

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between px-5 py-4 shadow-sm gap-4 flex-wrap">

        {/* Frequency filter */}

        <div className="flex flex-col text-gray-700 text-base font-medium">
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(val) => setFrequency(val)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="7">Last Week</Select.Option>
            <Select.Option value="30">Last Month</Select.Option>
            <Select.Option value="365">Last Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(val) => setSelectedDate(val)}
              className="mt-2"
            />
          )}
        </div>

        {/* Type filter */}

        <div className="flex flex-col text-gray-700 text-base font-medium">
          <h6>Select Type</h6>
          <Select value={type} onChange={(val) => setType(val)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </div>

        {/* View switch */}

        <div className="flex flex-col text-gray-700 text-base font-medium items-center">
          <div className="flex gap-2">
            <div
              className={`p-2 rounded-md border cursor-pointer ${viewData === "table"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              onClick={() => setViewData("table")}
            >
              <UnorderedListOutlined className="text-xl sm:text-2xl" />
            </div>
            <div
              className={`p-2 rounded-md border cursor-pointer ${viewData === "chart"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              onClick={() => setViewData("chart")}
            >
              <AreaChartOutlined className="text-xl sm:text-2xl" />
            </div>
          </div>
        </div>

        {/* Add Button */}

        <div className="flex justify-center sm:justify-end w-full sm:w-auto">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => {
              form.resetFields();
              setShowModal(true);
              setEditable(null);
            }}
          >
            Add New
          </button>
        </div>
      </div>

      {/* Table or Chart */}

      <div className="w-full overflow-x-auto p-4">
        {viewData === "table" ? (
          <Table
            columns={column}
            dataSource={allExpenses}
            rowKey="_id" 
            className="min-w-[600px] sm:min-w-full"
          />
        ) : (
          <Chart allExpenses={allExpenses} />
        )}
      </div>

      {/* Modal Form */}

      <Modal
        title={editable ? 'Edit Expense' : "Add Expense"}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
        }}
        footer={false}
      >
        <Form form={form} layout="vertical" onFinish={handlleSubmit}>
          <Form.Item label="Amount" name="amount" required>
            <Input type="number" placeholder="Enter amount" />
          </Form.Item>

          <Form.Item label="Type" name="type" required>
            <Select placeholder="Select type">
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category" required>
            <Select placeholder="Select category">
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="rent">Rent</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fees">Fees</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
              <Select.Option value="others">Others</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date" required>
            <Input type="date" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input type="text" placeholder="Enter description" />
          </Form.Item>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className={`flex justify-center items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded transition ${saving ? "cursor-not-allowed opacity-70" : "hover:bg-blue-700"
                }`}
            >
              {saving && (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              Submit
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
