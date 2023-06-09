import monitor1 from '../../img/monitor1.jpeg';
import monitor2 from '../../img/monitor2.jpeg';
import mouse from '../../img/mouse.jpeg';
import portatil2 from '../../img/poratatil2.jpeg';
import portatil3 from '../../img/poratatil3.jpeg';
import portatil4 from '../../img/poratatil4.jpeg';
import portatil1 from '../../img/poratil1.jpeg';
import teclado1 from '../../img/teclado1.jpeg';
import teclado2 from '../../img/teclado2.jpeg';
import teclado3 from '../../img/teclado3.jpeg';



const data = [
    {
        id:1,
        name:"Teclado Gamer",
        description:"Teclado con luces integradas, perfecto para jugar con amigos",
        price:50000,
        category:"Teclado",
        pictures:[teclado1, teclado2, teclado3],
        stock:2
    },
    {
        id:2,
        name:"Mouse Gamer",
        description:"Mouse gamer con luces para brillar con estilo, recomendado para la gente facha",
        price:100000,
        category:"Mouse",
        pictures:[mouse],
        stock:0
    },
    {
        id:3,
        name:"Monitor UHD",
        description:"Monitor de alta definicion para experimentar grandes escenarios",
        price:500000,
        category:"Monitor",
        pictures:[monitor1, monitor2],
        stock:20
    },
    {
        id:4,
        name:"Portatil Gamer",
        description:"Portatil exclusivo para jugar videojuegos, alda definicion y rendimiento con los mejores componentes del mundo",
        price:4000000,
        category:"Portatil",
        pictures:[portatil1, portatil2, portatil3, portatil4],
        stock:10
    }
]

export default data;