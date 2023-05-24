import React, { useEffect } from "react";
import { Form, Input, InputNumber, Modal, Select, Space } from "antd";
import { gql, useMutation } from "@apollo/client";
import {
  JobApplication,
  JobApplicationStage,
  SalaryBase,
} from "@/__generated__/graphql";

interface JobFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  clearData: () => void;
  job: JobApplication | null;
}

const CREATE_JOB = gql(`
  mutation CreateJobApplication($input: CreateJobApplicationInput!) {
    createJobApplication(createJobApplicationInput: $input) {
      id
      title
    }
  }
`);
const UPDATE_JOB = gql(`
  mutation UpdateJobApplication($input: UpdateJobApplicationInput!) {
    updateJobApplication(updateJobApplicationInput: $input) {
      id
      title
    }
  }
`);

const JobForm: React.FC<JobFormProps> = ({
  isModalOpen,
  setIsModalOpen,
  job,
  clearData,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (job) {
      form.setFieldsValue({
        title: job?.title,
        company: job?.company?.name,
        stage: job?.stage || "DRAFT",
        salaryAmount: job?.salaryAmount,
        salaryBase: job?.salaryBase || SalaryBase.Annually,
      });
    } else {
      form.resetFields();
      form.setFieldsValue({
        stage: "DRAFT",
        salaryBase: "ANNUALLY",
      });
    }
  }, [job]);

  const [
    createJobApplication,
    { data: createData, loading: loadingCreate, error: errorCreate },
  ] = useMutation(CREATE_JOB, {
    refetchQueries: ["JobApplications"],
  });

  const [
    updateJobApplication,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_JOB, {
    refetchQueries: ["JobApplications"],
  });

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    createJobApplication({
      variables: {
        input: {
          title: values.title,
          companyName: values.company,
          stage: values.stage,
          salaryAmount: values.salaryAmount,
          salaryBase: values.salaryBase,
        },
      },
    });
  };

  const onUpdate = (values: any) => {
    console.log("Received values of form: ", values);
    updateJobApplication({
      variables: {
        input: {
          id: job?.id,
          title: values.title,
          stage: values.stage,
          salaryAmount: values.salaryAmount,
          salaryBase: values.salaryBase,
        },
      },
    });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        if (job) {
          onUpdate(values);
        } else {
          onCreate(values);
        }
        setIsModalOpen(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    clearData();
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={`${job ? "Update" : "New"} Job Application`}
      open={isModalOpen}
      onOk={handleOk}
      okText="Create"
      width={600}
      onCancel={handleCancel}
    >
      <div style={{ padding: 20 }}></div>
      <Form
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        <Form.Item
          label="Position Title"
          name="title"
          rules={[
            { required: true, message: "Please input the position title!" },
          ]}
        >
          <Input placeholder="Frontend Engineer, Data..." />
        </Form.Item>

        <Form.Item name="company" label="Company">
          <Input placeholder="Acme Inc." />
        </Form.Item>

        <Form.Item name="stage" label="Stage">
          <Select>
            <Select.Option value={JobApplicationStage.Draft}>
              {"Draft"}
            </Select.Option>
            <Select.Option value={JobApplicationStage.Lead}>
              {"Lead"}
            </Select.Option>
            <Select.Option value={JobApplicationStage.Applied}>
              {"Applied"}
            </Select.Option>
            <Select.Option value={JobApplicationStage.FirstMeetingScheduled}>
              {"FirstMeetingScheduled"}
            </Select.Option>
            <Select.Option value={JobApplicationStage.FirstMeetingDone}>
              {"FirstMeetingDone"}
            </Select.Option>
            <Select.Option value={JobApplicationStage.Challenge}>
              {"Challenge"}
            </Select.Option>
            <Select.Option value={JobApplicationStage.Offer}>
              {"Offer"}
            </Select.Option>
            <Select.Option value={JobApplicationStage.Rejected}>
              {"Rejected"}
            </Select.Option>
            <Select.Option value={JobApplicationStage.Closed}>
              {"Closed"}
            </Select.Option>
            <Select.Option value={JobApplicationStage.Closed}>
              {"Closed"}
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Salary">
          <Space.Compact>
            <Form.Item name="salaryAmount">
              <InputNumber addonBefore="$" />
            </Form.Item>
            <Form.Item name="salaryBase">
              <Select>
                <Select.Option value={SalaryBase.Annually}>
                  Anually
                </Select.Option>
                <Select.Option value={SalaryBase.Monthly}>
                  Monthly
                </Select.Option>
                <Select.Option value={SalaryBase.Weekly}>Weekly</Select.Option>
                <Select.Option value={SalaryBase.Hourly}>Hourly</Select.Option>
              </Select>
            </Form.Item>
          </Space.Compact>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default JobForm;
