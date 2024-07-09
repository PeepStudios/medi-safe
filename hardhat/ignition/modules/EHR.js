const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("EHRModule", (m) => {
  // Add contract deployment
  const ehr = m.contract("EHR", []);

  // Optionally, you can add further setup steps here
  // e.g., adding a doctor or a patient

  console.log("EHR contract deployed at:", ehr.address);
});
