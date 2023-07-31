
import { Modal } from 'antd';
import FormPayment from '../formsAdmin/payment/FormPayment';

const ModalComp = ({isModalOpen, data, setIsModalOpen, title, dataPay}) => {
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	return (
		<>
			<Modal
				title={title}
				open={isModalOpen}
				footer={false}
				onCancel={handleCancel}
			>
				<FormPayment data={data} handleCancel={handleCancel} dataPay={dataPay} />
			</Modal>
		</>
	);
};
export default ModalComp;