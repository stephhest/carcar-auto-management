import React from 'react';

class ModelFormClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        picture_url: '',
        manufacturer_id: '',
        manufacturers: [],
    }

    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleChangeName = this.handleChangeName.bind(this);

    this.handleChangePictureUrl = this.handleChangePictureUrl.bind(this);

    this.handleChangeManufacturer = this.handleChangeManufacturer.bind(this);
  }

  async componentDidMount() {
    const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
    const response = await fetch(manufacturerUrl);

    if (response.ok) {
      const data = await response.json();
      this.setState({ manufacturers: data.manufacturers });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    delete data.manufacturers;

    const modelUrl = 'http://localhost:8100/api/models/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const response = await fetch(modelUrl, fetchConfig);
    if (response.ok) {
      this.setState({
        name: '',
        picture_url: '',
        manufacturer_id: '',
      })
      this.props.fetchModels();
      alert("Successfully created vehicle model")
    }
  }

  handleChangeName(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }

  handleChangePictureUrl(event) {
    const value = event.target.value;
    this.setState({ picture_url: value });
  }


  handleChangeManufacturer(event) {
    const value = event.target.value;
    this.setState({ manufacturer: value });
  }

  render() {
    return (
      <>
        <div className="my-5 container">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a model</h1>
              <form onSubmit={this.handleSubmit} id="create-model-form">
                <div className="form-floating mb-3">
                  <input onChange={this.handleChangeName} value={this.state.name}  placeholder="name" required type="text" name="name" id="name" className="form-control" />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handleChangePictureUrl} value={this.state.picture_url}  placeholder="" required type="url" name="picture_url" id="picture_url" className="form-control" />
                  <label htmlFor="picture_url">Picture URL</label>
                </div>
                <div className="mb-3">
                  <select onChange={this.handleChangeManufacturer} value={this.state.manufacturer_id} required name="manufacturer" id="manufacturer" className="form-select">
                    <option value="">Choose a manufacturer</option>
                    {this.state.manufacturers.map(manufacturer => {
                      return (
                        <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                      )
                    })}
                  </select>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default ModelFormClass;
