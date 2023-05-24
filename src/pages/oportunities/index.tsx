import { Button, Modal, Space, Typography } from "antd";
import { Breadcrumb } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import JobForm from "../../components/oportunities/JobForm";
import Head from "next/head";
import { JobApplication } from "@/__generated__/graphql";
import List from "@/components/oportunities/list/list";

const { Title } = Typography;

export default function Oportunities() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = React.useState<JobApplication | null>(
    null
  );

  const launchCreate = () => {
    setIsModalOpen(true);
  };

  const clearEditingJob = () => {
    setEditingJob(null);
  };

  const launchEdit = (jobApplication: JobApplication) => {
    setEditingJob(jobApplication);
    setIsModalOpen(true);
  };

  return (
    <div>
      <Head>
        <title>Job applications | Hiremancer</title>
      </Head>
      <Title>Job applications</Title>
      <Breadcrumb
        items={[
          {
            title: <Link href="/">Home</Link>,
          },
          {
            title: "Job applications",
          },
        ]}
      />
      <div style={{ marginTop: "40px" }}>
        <Button type="primary" onClick={launchCreate}>
          New job application
        </Button>

        <JobForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} job={editingJob} clearData={clearEditingJob} />

        <List onEdit={launchEdit} />
      </div>
    </div>
  );
}
