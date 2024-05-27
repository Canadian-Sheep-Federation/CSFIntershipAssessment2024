
export default function List({ listItems }) {
  
  return (
    <div>
      {listItems.map((items, index) => {

        return (
          <ol key={index} >
            {items.map((details, sIndex) => {

              const styles = details[3] === "Low" ? {"border": "1.5px solid green"} 
              : (details[3] === "Medium" ? {"border": "1.5px solid orange"} 
              : {"border": "1.5px solid red"});

              return (
                <section key={sIndex} className="container" style={styles}>

                  <div className="details">
                    <p className="text_extrasmall">ID: {details[0]}</p>
                    <p className="text_extrasmall">{details[1]}</p>
                  </div>

                  <div className="main_Content">

                    <div className="symptoms">
                      <p className="text_large">{details[2]}</p>
                      <p className="text_small">{details[3]}</p>
                    </div>

                    <div>
                      <div className="symptoms">
                        <p className="text_small">{details[5]}</p>
                        <p className="text_small">{details[6]}ºC</p>
                        <p className="text_extrasmall">Humidity: {details[7]}</p>
                        <p className="text_extrasmall">BP: {details[8]}</p>
                      </div>

                      <div className="weather">
                        <img src={details[4]} />
                      </div>
                    </div>

                  </div>

                </section>
              );
            })}
          </ol>
        );

      })}

    </div>
  );
}