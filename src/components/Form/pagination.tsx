




export default function Pagination(){


    return(
<>
<div className="flex justify-between items-center h-8 text-xs">


<div className="">

<strong>0</strong><strong> - </strong><strong>10</strong> de <strong>100</strong>

</div>






    <div className="flex list-style-none items-center">
     
        <button className=" relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-slate-200  hover:bg-slate-200 hover:text-gray-800 focus:shadow-none">
          <span aria-hidden="true">&laquo;</span>
        </button>
       
     
        <button className=" relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-slate-200  hover:bg-slate-200 hover:text-gray-800 focus:shadow-none">
         1
        </button>
        <button className=" relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-slate-200  hover:bg-slate-200 hover:text-gray-800 focus:shadow-none">
         2
        </button>   
        <button className=" relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-slate-200  hover:bg-slate-200 hover:text-gray-800 focus:shadow-none">
         3
        </button>        
        
        <button className=" relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-slate-200  hover:bg-slate-200 hover:text-gray-800 focus:shadow-none">
          <span aria-hidden="true">&raquo;</span>
        </button>
       
    </div>
 
</div>





</>



    )
}