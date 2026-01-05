import PropTypes from "prop-types";
import {Link } from 'react-router-dom'

const Table = ({ caption, fields, rows, resourceName, playlistId }) => {
  
    return (
      <>
        <table className= 'table table-sm custom-v07'>
          <caption> {caption}</caption>
          <thead>
            <tr>
            {fields.map((field,key) => (
              <th key = {key}>             
                  {field.label} 
                  <i className="bi bi-sort-alpha-down"></i>
              </th>
            ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (       //each row will get a row
              <tr key={rowIndex}>
                {fields.map((field,fieldIndex) => ( 
                  <td key={`${rowIndex}-${fieldIndex}`}> {resourceName === '/playlists' ? (<Link to={`${resourceName}/${row.id}/songs`} state={row}>{row[field.name]}</Link>) : (row[field.name])}</td>
                ))}
                  <td key ={`edit-${rowIndex}`}>  {resourceName === '/playlists' ? (<Link className="btn btn-secondary mr-2" to={`${resourceName}/${row.id}/update`} state={row}>edit</Link>) : (<Link className="btn btn-secondary mr-2" to={`/playlists/${playlistId}/songs/${row.id}/update`} state={row}>edit</Link>) }  </td>
                  <td key ={`delete-${rowIndex}`}>  {resourceName === '/playlists' ? (<Link className="btn btn-danger mr-2" to={`${resourceName}/${row.id}/delete`} state={row}>delete</Link>) : (<Link className="btn btn-danger mr-2" to={`/playlists/${playlistId}/songs/${row.id}/delete`} state={row}>delete</Link>) }  </td> 
              </tr>
            ))
            }   
          </tbody>
        </table>
      </>
    );
  };

Table.propTypes ={  //kollar typ, en react helper
  caption: PropTypes.string,
  fields: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  resourceName: PropTypes.string,

}

export default Table;