import { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Container,
} from "@mui/material";

const Form = ({ setData }) => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    traits: {
      femininemasculine: "",
      playfulserious: "",
      luxuriousaffordable: "",
      modernclassic: "",
      youthfulmature: "",
      loudsubdued: "",
    },
  });

  const traitPairs = [
    "feminine/masculine",
    "playful/serious",
    "luxurious/affordable",
    "modern/classic",
    "youthful/mature",
    "loud/subdued",
  ];

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleTraitChange(trait, value) {
    setFormData({
      ...formData,
      traits: { ...formData.traits, [trait]: value },
    });
  }

  async function handleSubmit(event, data) {
    if (event) event.preventDefault();
    setSubmitting(true);

    if (!data)
      data = { ...formData, industry: formData.industry.toLowerCase() };

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    console.log(json);
    const result = json.result
      .replaceAll("\n", "")
      .replaceAll("/", "")
      .replaceAll(/,\s*\}/g, "}");
    console.log(result);
    const parsedResult = JSON.parse(result);
    console.log(parsedResult);
    setData({
      ...parsedResult,
      companyName: data.companyName,
    });
    setSubmitting(false);
  }

  async function testAPI() {
    const companyName = "CyberTekIQ";
    const industry = "cyber security";
    const traits = {
      femininemasculine: "masculine",
      playfulserious: "serious",
      luxuriousaffordable: "luxurious",
      modernclassic: "modern",
      youthfulmature: "mature",
      loudsubdued: "subdued",
    };
    const data = { companyName, industry, traits };
    handleSubmit(null, data);
  }

  const renderTraitRadioGroup = (traitPair) => {
    const [traitA, traitB] = traitPair.split("/");
    return (
      <FormControl component="fieldset">
        <RadioGroup
          row
          value={formData.traits[`${traitA}${traitB}`]}
          onChange={(event) =>
            handleTraitChange(`${traitA}${traitB}`, event.target.value)
          }
          required
        >
          <FormControlLabel
            value={traitA}
            control={<Radio required />}
            label={traitA}
            className="w-32"
          />
          <FormControlLabel value={traitB} control={<Radio />} label={traitB} />
        </RadioGroup>
      </FormControl>
    );
  };

  return (
    <Container maxWidth="sm" className="mt-8">
      <div className="flex items-center justify-between">
        <Typography variant="h4" component="h1">
          Company Profile
        </Typography>
        <button
          onClick={testAPI}
          disabled={submitting}
          className={`px-4 py-1.5 mt-4 bg-blue-400 uppercase rounded text-white border border-blue-400 hover:text-blue-400 hover:bg-white ${
            submitting ? "hover:bg-blue-400 hover:text-white" : null
          }`}
        >
          {submitting ? "Generating..." : "Test"}
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Industry"
          name="industry"
          value={formData.industry}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <Typography variant="h6" component="h2" gutterBottom>
          Traits
        </Typography>
        {traitPairs.map((traitPair) => (
          <div key={traitPair}>{renderTraitRadioGroup(traitPair)}</div>
        ))}
        <button
          type="submit"
          disabled={submitting}
          className={`px-4 py-1.5 mt-4 bg-blue-400 uppercase rounded text-white border border-blue-400 hover:text-blue-400 hover:bg-white ${
            submitting ? "hover:bg-blue-400 hover:text-white" : null
          }`}
        >
          {submitting ? "Generating..." : "Submit"}
        </button>
      </form>
    </Container>
  );
};

export default Form;
