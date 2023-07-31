const confirmValue = ({getFieldValue}:any) => ({

        validator(_: any, value: any) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }

            return Promise.reject(new Error('The two passwords that you entered do not match!'));
        },
    })

export {
    confirmValue,
}