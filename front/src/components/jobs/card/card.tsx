import React from 'react'
import {
  infoBot,
  forCard,
  info,
  onDescription,
  infoTop,
  forTags,
  forTagsItem,
} from "./styles";
import { Card, Button} from 'antd';
import { getTags } from "./cardHooks";
import { useCountBidsJobQuery } from 'components/bid/bidStore'


const CardComponent = ({item}:any) => {
  const { data: bid } = useCountBidsJobQuery(item.id)


  return (
    <Card title={item.title} hoverable style={forCard}>
      <div style={onDescription}>
        <div style={info}>
          <div style={infoTop}>{item.hourlyRate}</div>
          <div style={infoBot}>Оплата за годину</div>
        </div>
        <div style={info}>
          <div style={infoTop}>{item.duration}</div>
          <div style={infoBot}>Час на виконання</div>
        </div>
        <div style={info}>
          <div style={infoTop}>{item.englishLevel}</div>
          <div style={infoBot}>Рівень англійського</div>
        </div>
        <div style={info}>
          <div style={infoTop}>{bid}</div>
          <div style={infoBot}>Кількість відгуків</div>
        </div>
      </div>
      <p>{item.description.length > 310 ? item.description.substr(0, 310) + '...' : item.description}</p>
      <div>{item.tags
        &&
        <ul style={forTags}>
          {getTags(item.tags).length > 8 ?
            getTags(item.tags).slice(0, 5).map(e => <li key={e} style={forTagsItem}>{e}</li>)
            : getTags(item.tags).map(e => <li key={e} style={forTagsItem}>{e}</li>)}
        </ul>
      }
      </div>
      <Button type="primary" shape="round" size='small' href={`job/${item.id}`} >
        Побачити більше
      </Button>
    </Card>
  )
}

export default CardComponent
