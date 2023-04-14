import { useState, useRef } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";

const CustomButton = styled(Button)({
  color: "#333",
  "&:hover": {
    color: "#fff",
  },
});

const Form = ({ setData }) => {
  const submitBtnRef = useRef(null);
  const [formValues, setFormValues] = useState({
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
    setFormValues({ ...formValues, [name]: value });
  }

  function handleTraitChange(trait, value) {
    setFormValues({
      ...formValues,
      traits: { ...formValues.traits, [trait]: value },
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    submitBtnRef.current.disabled = true;
    submitBtnRef.current.textContent = "Generating...";

    const data = { formValues };
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    const result = json.result.replaceAll("\n", "").split("/end/");

    const tagline = result[1].split(":")[1].trim();
    const typography = result[2].split(":")[1].trim();
    const primaryColor = result[3].split(":")[1].trim();
    const accentColor = result[4].split(":")[1].trim();
    const neutralColor = result[5].split(":")[1].trim();
    const summary = result[6].split(":")[1].trim();

    const hex1 = primaryColor.slice(0, 7);
    const hex2 = accentColor.slice(0, 7);
    const hex3 = neutralColor.slice(0, 7);

    const formData = {
      tagline,
      typography,
      primaryColor,
      accentColor,
      neutralColor,
      summary,
      hex1,
      hex2,
      hex3,
    };

    setData(formData);
  }

  async function testAPI() {
    const name = "CyberTekIQ";
    const industry = "Cyber Security";
    const traits = {
      femininemasculine: "masculine",
      playfulserious: "serious",
      luxuriousaffordable: "luxurious",
      modernclassic: "modern",
      youthfulmature: "mature",
      loudsubdued: "subdued",
    };
    const data = {
      formValues: { companyName: name, industry: industry, traits: traits },
    };
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    const result = json.result.replaceAll("\n", "").split("/end/");

    const tagline = result[1].split(":")[1].trim();
    const typography = result[2].split(":")[1].trim();
    const primaryColor = result[3].split(":")[1].trim();
    const accentColor = result[4].split(":")[1].trim();
    const neutralColor = result[5].split(":")[1].trim();
    const summary = result[6].split(":")[1].trim();

    const hex1 = primaryColor.slice(0, 7);
    const hex2 = accentColor.slice(0, 7);
    const hex3 = neutralColor.slice(0, 7);

    const formData = {
      tagline,
      typography,
      primaryColor,
      accentColor,
      neutralColor,
      summary,
      hex1,
      hex2,
      hex3,
    };

    setData(formData);
  }

  const renderTraitRadioGroup = (traitPair) => {
    const [traitA, traitB] = traitPair.split("/");
    return (
      <FormControl component="fieldset">
        <RadioGroup
          row
          value={formValues.traits[`${traitA}${traitB}`]}
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
        {/* <CustomButton variant="contained" onClick={testAPI}>
          Test API
        </CustomButton> */}
      </div>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Company Name"
          name="companyName"
          value={formValues.companyName}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Industry"
          name="industry"
          value={formValues.industry}
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
        <CustomButton
          ref={submitBtnRef}
          variant="contained"
          type="submit"
          className="mt-4"
        >
          Submit
        </CustomButton>
      </form>
    </Container>
  );
};

export default Form;
