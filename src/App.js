import './App.css';
import { Children, useState } from 'react';

const fruits = ['apple', 'appleDelicious', 'orangeOriginal', 'orangeMalta', 'banana', 'anar', 'naspati'];
const fruitsInventory = {
  "apple": {
    "id": "apple",
    "name": "apple",
    "price": 120,
    "quantity": 0
  },
  "appleDelicious": {
    "id": "appleDelicious",
    "name": "appleDelicious",
    "price": 140,
    "quantity": 0
  },
  "orangeOriginal": {
    "id": "orangeOriginal",
    "name": 'orangeOriginal',
    "price": 100,
    "quantity": 0
  },
  "orangeMalta": {
    "id": "orangeMalta",
    'name': 'orangeMalta',
    "price": 80,
    "quantity": 0
  },
  "banana": {
    "id": "banana",
    'name': 'banana',
    "price": 50,
    "quantity": 0
  },
  "anar": {
    "id": "anar",
    "name": "anar",
    "price": 200,
    "quantity": 0
  },
  "naspati": {
    "id": "naspati",
    "name": "naspati",
    "price": 220,
    "quantity": 0
  }
 }

const CollapsibleItem = ({ itemName, onDelete, children, isOpen, setIsOpen }) => {

  return (
    <div>
      <div style={{cursor: 'pointer', borderBottom: '1px solid #ccc'}} onClick={() => setIsOpen(!isOpen)}>
        {itemName}
        <button style={{marginLeft:'10px', float:'right'}} onClick={(e) => {
          // e.stopPropagation();
          onDelete(itemName)
        }}>
          Remove
        </button>
          </div>
        {isOpen && Children.map(children, child =>
          <div className="Row">
            {child}
          </div>
        )}
    </div>
  )
}

const ItemForm = ({ item, updateItems, itemName, customer }) => {

  const itemFormUpdateName = (id, value) => {

  }

  const itemFormUpdatePrice = (id, value) => {
    updateItems(id, value, 'price', customer);
  }

  const itemFormUpdateQuantity = (id, value) => {
    updateItems(id, value, 'quantity', customer);
  }

  return (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>
        <label>
          <input 
            type="number" 
            value={item.price} 
            onChange={(e) => {
              e.stopPropagation();
              itemFormUpdatePrice(item.id, e.target.value)
            }}>
          </input>
        </label>
      </td>
      <td>
        <input type="number" value={item.quantity} onChange={(e) => itemFormUpdateQuantity(item.id, e.target.value)}></input>
      </td>
      <td>{item.price * item.quantity}</td>
    </tr>
  )
}

function CollapsibleItemWrapper ({itemName, index, handleRemoveItem, customer}) {
  const [items, setItems] = useState(structuredClone(fruitsInventory));
  const [isOpen, setIsOpen] = useState(true);

  const handleAddItem = () => {

  }

   
  const updateItems = (id, value, fieldToUpdate, customer) => {
    let itemToUpdate = items[id]
    itemToUpdate[fieldToUpdate] = value;
    setItems({...items, [id]: itemToUpdate});
  }

  const getTotal = (items) => {
    let sum = 0;
    fruits.forEach((fruit) => {
      const price = items[fruit].price;
      const quantity = items[fruit].quantity;
      sum += (price * quantity);
    });
    return sum;
  }

  return (
    <CollapsibleItem itemName={itemName} key={itemName+index} onDelete={handleRemoveItem} isOpen={isOpen} setIsOpen={setIsOpen}>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {fruits.map((fruitItem, index) => {
            return <ItemForm customer={customer} key={index} item={items[fruitItem]} onAdd={handleAddItem} updateItems={updateItems}/>
          })}
        </tbody>
      </table>
      <div>
        <input disabled value={getTotal(items)} type="number"></input>
      </div>
    </CollapsibleItem>
  );
}

function App() {
  const [totalCustomers, setTotalCustomers] = useState([]);
  const [customerToAdd, setCustomerToAdd] = useState('');

  const handleRemoveItem = (item) => {
    const updatedItems = totalCustomers.filter((i) => i !== item);
    setTotalCustomers(updatedItems);
  }

  const handleAddItem = () => {
    if (customerToAdd.length === 0) {
      let i = totalCustomers.length + 1;
      while (true) {
        const tempCustomerToAdd = `customer+${i}`;
        if (totalCustomers.includes(tempCustomerToAdd)) {
          i++;
        } else {
          setTotalCustomers([...totalCustomers, tempCustomerToAdd])
          break;
        }
      }
    } else {
      setTotalCustomers([...totalCustomers, customerToAdd])
    }
  }

  return (
    <div>
      <h1>Shopping List</h1>
      <label for="itemName">
        <input type="text" value={customerToAdd} onChange={(e) => setCustomerToAdd(e.target.value)}></input>
      </label>
      <button onClick={handleAddItem}>Add Item</button>
      {totalCustomers.map((customer, index) => {
        return <div key={customer}>
          <CollapsibleItemWrapper itemName={customer} index={index} handleRemoveItem={handleRemoveItem} customer={customer}/>
          <br/>
        </div>
      })}
    </div>
  );
}

export default App;
