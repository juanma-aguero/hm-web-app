import { JobApplication } from "@/__generated__/graphql";
import { gql, useMutation } from "@apollo/client";
import {
  Button,
  Modal,
  Space,
  Card,
  Descriptions,
  Dropdown,
  Typography,
} from "antd";
import { EllipsisOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import Link from "next/link";

const { confirm } = Modal;

const { Title, Text } = Typography;

const DELETE_JOB = gql(`
  mutation RemoveJobApplication($id: String!) {
    removeJobApplication(id: $id) {
      id
    }
  }
`);

type ItemArgs = {
  jobApplication: JobApplication;
  onEdit: (jobApplication: JobApplication) => void;
};

const Item: React.FC<ItemArgs> = ({ jobApplication, onEdit }) => {
  const [
    removeJobApplication,
    { data: createData, loading: loadingCreate, error: errorCreate },
  ] = useMutation(DELETE_JOB, {
    refetchQueries: ["JobApplications"],
  });

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this application?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK");
        removeJobApplication({ variables: { id: jobApplication.id } });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <Card
      title={
        <Link href={`/oportunities/${jobApplication.id}`}>
          {jobApplication.title}
        </Link>
      }
      extra={
        <Dropdown
          trigger={["click"]}
          menu={{
            items: [
              {
                label: (
                  <Button type="link" onClick={() => onEdit(jobApplication)}>
                    Edit
                  </Button>
                ),
                key: `${jobApplication.id}-action-edit`,
              },
              {
                label: (
                  <Button type="link" onClick={showDeleteConfirm}>
                    Delete
                  </Button>
                ),
                danger: true,
                key: `${jobApplication.id}-action-delete`,
              },
            ],
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <EllipsisOutlined />
          </a>
        </Dropdown>
      }
      style={{ width: 300 }}
    >
      <div>
        <Descriptions column={1}>
          <Descriptions.Item label="Company">
            {jobApplication.company?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Salary">
            $ {jobApplication.salaryAmount}
            <Text type="secondary" style={{ fontSize: 10, marginLeft: 10 }}>
              ({jobApplication.salaryBase})
            </Text>
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Card>
  );
};

export default Item;
