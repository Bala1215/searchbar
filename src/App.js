import {useState,useRef} from 'react';
import './App.css'

function App() {
  
  //items : used to store the items which entered by the user through textbox
  //setItems : used to update the items array
  const [items,setItems] = useState([])

  //query is used to store the item which we wanna search i.e, value of the search box
  const [query,setQuery] = useState("")

  //filteredItems used to store the items which matches the search item 
  const filteredItems = items.filter(item=>{
    return item.toLowerCase().includes(query.toLowerCase())
  })

  /*
  //filteredIems array is used to override and store the value of array "items"
  //to find the items which searched 

  const [filteredItems,setFilteredItems] = useState([])

  In this method, filteredItems array is derived from the array items (not advisable)
  */

  
  //get the current value of the textbox from the DOM using "useRef()"
  const inputRef = useRef()

  /*function onChangeItems()=>{
     return setItems(prevItems=> 
      [...prevItems,items])
  }*/

  function onSubmit(e){
    //prevent the form reloaded
    e.preventDefault();
    //store the current value of the textbox in "value" variable
    const value = inputRef.current.value

    if (value ==='') return 

    //if the value is not null, then that value stored into items array using "setItems()"
    setItems(prev=>{
      return [...prev,value]
    })

  

    console.log(items);
    inputRef.current.value = ''

   
  }

  function onChange(e){
    const value = e.target.value
    /**
     * whenever the search box gets focused , 
     * then store the current value of the search box in "value" variable.
       using "setItems" method , filter the items which matches the "value" i.e., search box value 
    
    setItems(prev=>{
      return prev.filter(item=>
        item.toLowerCase().includes(value.toLowerCase())
        )
    })
     disadvantage of the above method of filtering the items is that it will delete the unmatched items */


     setItems(items=>{
      return items.filter(items=>
        items.toLowerCase().includes(value.toLowerCase())
        )
    })
  }
  return (
    <div className="searchBar">
      <form onSubmit={onSubmit}>
       <label>Search</label>
        <input id='searchBox' type='search' value={query} onChange={e=>setQuery(e.target.value)}/><br/><br/>
        
        <label>New Item</label> <input id='inputBox' type='text' ref={inputRef} />
        <button id="submitBtn" type='submit'>Add</button>
      </form> 
      <h2>Items :</h2>
      {
        filteredItems.map(item=>(
        <div>{item}</div>)
        )
      }   
    </div>
  );
}

export default App;
