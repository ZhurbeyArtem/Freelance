import { Select, UploadProps } from "antd";
import { message } from 'antd';

const { Option } = Select;
export const getNameTags = (tags) =>{
    const list = []
    tags?.forEach(e => {
        list.push(<Option key={e.name}>{e.name}</Option>)
    })
    return list
}

export const props: UploadProps = {
    name: 'file',
    multiple: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};