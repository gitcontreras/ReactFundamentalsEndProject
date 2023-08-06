
import StarCompleted from "../assets/images/StarCompleted.png";
import StarEmpty from "../assets/images/StarEmpty.png";

export default function Stars(props: { item: any; }) {
    const { item } = props;

    const stars = []
    for (let i = 0; i < 10; ++i) {
      if(i<=item)  
      stars.push(<img key={i} src={StarCompleted} alt="star" className="img-stars"/>)
      else
      stars.push(<img key={i} src={StarEmpty} alt="star" className="img-stars"/>)
    }
  
    return (
      <div >
        {stars}
      </div>
    )
 
}


