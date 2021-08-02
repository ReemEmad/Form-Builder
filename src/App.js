import React, { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import "./App.css"

const App = () => {
  const [showEdit, setshowEdit] = useState(true)

  const [showValid, setshowValid] = useState(false)

  const [currentIndex, setcurrentIndex] = useState(null)

  const [requiredInputs, setrequiredInputs] = useState({})

  const [types, setTypes] = useState({})

  const [currentType, setcurrentType] = useState("text")

  const myTypes = [
    { id: 0, value: "text" },
    { id: 1, value: "number" },
    { id: 2, value: "textarea" },
    { id: 3, value: "radio" },
    { id: 4, value: "datetime-local" },
    { id: 5, value: "decimalnumber" },
  ]

  const [updatedLabel, setupdatedLabel] = useState({})

  const { register, control, handleSubmit, getValues } = useForm()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  })
  const onSubmit = (data) => {
    console.log(data)
    alert("Thank you")
  }
  const edit = (index) => {
    setcurrentIndex(index)
    setshowValid(!showValid)
  }

  const handleAdd = () => {
    append({})
    const lastItemIndex = fields.length
    setcurrentIndex(lastItemIndex)
    setshowValid((prevState) => !prevState)
  }
  const updateChanges = (id) => {
    setupdatedLabel({ ...updatedLabel, [id]: getValues(`updated${id}`) })
    setTypes({ ...types, [id]: currentType })
    setshowValid(!showValid)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form form-panel">
        <div className="form-content">
          <div className="form-header">
            <h1>My Form</h1>
          </div>
          {fields.map(({ id }, index) => {
            return (
              <div key={id}>
                {types !== undefined ? (
                  types[id] === "textarea" ? (
                    <div className="form-group">
                      <textarea
                        ref={register()}
                        name={`textarea - ${id}`}
                        required={
                          requiredInputs !== undefined
                            ? requiredInputs[id]
                            : false
                        }
                        placeholder={
                          updatedLabel !== undefined ? updatedLabel[id] : ""
                        }
                      ></textarea>
                      {/* edit & remove  */}
                      {showEdit && (
                        <div className="btn-group-edit">
                          <button
                            ref={register()}
                            type="button"
                            disabled={showValid}
                            onClick={() => edit(index)}
                          >
                            edit
                          </button>
                          <button
                            id="rem"
                            ref={register()}
                            type="button"
                            onClick={() => remove(index)}
                          >
                            remove
                          </button>
                        </div>
                      )}
                    </div>
                  ) : types[id] === "radio" ? (
                    <>
                      <div className="form-group">
                        <p>
                          {updatedLabel !== undefined ? updatedLabel[id] : ""}
                        </p>
                        <div className="radio-btn">
                          <input
                            ref={register()}
                            name={`input - ${id}`}
                            type={types[id]}
                            value="yes"
                            required={
                              requiredInputs !== undefined
                                ? requiredInputs[id]
                                : false
                            }
                          ></input>
                          <label>yes</label>

                          <input
                            ref={register()}
                            name={`input - ${id}`}
                            type={types[id]}
                            value="no"
                            required={
                              requiredInputs !== undefined
                                ? requiredInputs[id]
                                : false
                            }
                          ></input>
                          <label>no</label>
                        </div>
                        {/* edit & remove  */}
                        {showEdit && (
                          <div className="btn-group-edit">
                            <button
                              ref={register()}
                              type="button"
                              disabled={showValid}
                              onClick={() => edit(index)}
                            >
                              edit
                            </button>
                            <button
                              id="rem"
                              ref={register()}
                              type="button"
                              onClick={() => remove(index)}
                            >
                              remove
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  ) : types[id] === "decimalnumber" ? (
                    <div className="form-group">
                      <input
                        ref={register()}
                        name={`input - ${id}`}
                        type="number"
                        required={
                          requiredInputs !== undefined
                            ? requiredInputs[id]
                            : false
                        }
                        step=".5"
                        placeholder={
                          updatedLabel !== undefined ? updatedLabel[id] : ""
                        }
                      ></input>
                      {/* edit & remove  */}
                      {showEdit && (
                        <div className="btn-group-edit">
                          <button
                            ref={register()}
                            type="button"
                            disabled={showValid}
                            onClick={() => edit(index)}
                          >
                            edit
                          </button>
                          <button
                            id="rem"
                            ref={register()}
                            type="button"
                            onClick={() => remove(index)}
                          >
                            remove
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="form-group">
                      <input
                        ref={register()}
                        name={`input - ${id}`}
                        type={types[id]}
                        required={
                          requiredInputs !== undefined
                            ? requiredInputs[id]
                            : false
                        }
                        placeholder={
                          updatedLabel !== undefined ? updatedLabel[id] : ""
                        }
                      ></input>

                      {/* edit & remove  */}
                      {showEdit && (
                        <div className="btn-group-edit">
                          <button
                            ref={register()}
                            type="button"
                            disabled={showValid}
                            onClick={() => edit(index)}
                          >
                            edit
                          </button>
                          <button
                            id="rem"
                            ref={register()}
                            type="button"
                            onClick={() => remove(index)}
                          >
                            remove
                          </button>
                        </div>
                      )}
                    </div>
                  )
                ) : (
                  <div className="form-group">
                    <input
                      ref={register()}
                      name={`input - ${id}`}
                      type={currentType}
                      required={
                        requiredInputs !== undefined
                          ? requiredInputs[id]
                          : false
                      }
                      placeholder={
                        updatedLabel !== undefined ? updatedLabel[id] : ""
                      }
                    ></input>
                    {/* edit & remove  */}
                    {showEdit && (
                      <div className="btn-group-edit">
                        <button
                          ref={register()}
                          type="button"
                          disabled={showValid}
                          onClick={() => edit(index)}
                        >
                          edit
                        </button>
                        <button
                          id="rem"
                          ref={register()}
                          type="button"
                          onClick={() => remove(index)}
                        >
                          remove
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {showEdit && showValid && index === currentIndex && (
                  <div className="form-group-secondary">
                    <label>Name</label>
                    <input type="text" name={`updated${id}`} ref={register} />

                    <label>Type</label>
                    <select
                      ref={register()}
                      name="select"
                      defaultValue={currentType}
                      onChange={(e) => setcurrentType(e.target.value)}
                    >
                      {myTypes.map((type) => (
                        <option key={type.id} value={type.value}>
                          {type.value}
                        </option>
                      ))}
                    </select>

                    <label>required</label>
                    <input
                      ref={register()}
                      name="required"
                      type="checkbox"
                      onChange={() =>
                        setrequiredInputs({
                          ...requiredInputs,
                          [id]: !requiredInputs[id],
                        })
                      }
                      checked={
                        requiredInputs !== undefined
                          ? requiredInputs[id]
                          : false
                      }
                    ></input>

                    <button type="button" onClick={() => updateChanges(id)}>
                      Update
                    </button>
                  </div>
                )}
              </div>
            )
          })}

          <br></br>
          <div className="btn-group">
            {!showEdit && (
              <button className="button" type="submit">
                Submit
              </button>
            )}
            {showEdit && (
              <div className="btn-group-right">
                <button type="button" disabled={showValid} onClick={handleAdd}>
                  Add Input
                </button>
                <button
                  type="button"
                  id="btn-edit"
                  onClick={() => setshowEdit(false)}
                >
                  Done Editing
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  )
}

export default App
