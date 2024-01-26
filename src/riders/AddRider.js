import React from 'react'

export default function AddRider() {
  return (
    <div className='container'>
        <div className="row">
            <div className='col-md-6 offset-md-3 border rounded p-1 mt-2 shadow'>
            <h2 className='text-center m-4'>Rigister User</h2>
            <div className='mb-3'>
                <label>name</label>
            </div>
            <div class="input-group mb-3">
  <input type="file" class="form-control" id="inputGroupFile02"/>
  <label class="input-group-text" for="inputGroupFile02">Upload</label>
</div>
            </div>

        </div>

    </div>
  )
}
