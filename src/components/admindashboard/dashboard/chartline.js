
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
const data = {
    labels: ['Jan', 'Mar', 'May', 'July', 'Oct','nov','dec'],
    datasets: [
      {
        label: 'sales',
        data: [400, 1000, 1500,2000, 800, 1500,2000,4000],
        backgroundColor:	"#AED6F1 ",
        fill: true,
        pointBackgroundColor:"#ffffff",
        pointBorderColor:"#8884d8",
        pointBorderWidth:8,
        pointRadius:8,
        tension: 0.4,
        xAxisID:true,
        yAxisID:"ds",
        borderColor:"#3498DB",
        showLine:true,
        
      },
    ],
  };
  
  const options = {
    plugins:{legend:{display:false}},
    layout:{padding:{bottom:100}},
    scales: {
      y:{
       
                display: false
      
      },
      x:{
          
        ticks:{
          color:"white",
          font:{
            size:18
          }
        }
      }
    },
  };
  
  function ChartLine() {
    return (
      <div>
        <h2 className='text-xl font-semibold'>Total Sales</h2>
        <Line className='mt-5' data={data} options={options}/>
      </div>
    );
  }
  
  export default ChartLine;