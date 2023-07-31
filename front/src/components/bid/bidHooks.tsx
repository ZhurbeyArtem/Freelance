export const columns = [
    {
        title: 'Ціна',
        dataIndex: 'Bid_price',
        key: 'price',
    },
    {
        title: 'Посилання на роботу',
        dataIndex: 'link',
        key: 'link',
    },
    {
        title: 'Інформація користувача',
        dataIndex: 'total',
        key: 'user',
        render: (text, record) => (
            <div>
                <p>Кількість виконаних робіт: {text}</p> 
                 <p>Середній рейтинг: {record.rating === null ? 0 : Number(record.rating).toFixed(1)}</p>  
                 <p>email: {record.user_email}</p>
                 <p>Телефон: {record.user_phoneNumber}</p>
                <p>Ім&apos;я: {record.user_firstName}</p> 
            
            </div>
        )
    },
];
