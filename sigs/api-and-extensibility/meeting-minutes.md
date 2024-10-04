# API and extensibility SIG meeting minutes

## 03-October-2024

### Attendees

- @AleksandarCole
- @DamjanBecirovic 
- @darkofabijan 
- @hamir-suspect 
- @lucaspin
- @radwo 

### Agenda

- Discussion on Triggers and Tasks within Semaphore
- Improvements to Project and Workflow API
- Future-proofing the API for extensibility

### Changes Discussed

The changes discussed in this meeting can be found in the following commit: [Commit with changes](https://github.com/semaphoreci/semaphore/pull/224/commits/0e1ae444af66d50f8a0102d12e0ca96a2d0723f3).

### Notes

1. Task Restructuring

Tasks will be integrated into a broader Project Triggers mechanism.
Triggers will include repository hooks, API calls, and other types.
The goal is to ensure consistency of triggers across Semaphore and enhance versatility to support various external platforms (e.g., S3, Dockerhub).

2. Trigger Definition

Proposal: Each trigger will be defined by:
- When: Specifies the conditions under which the trigger will execute.
- What: Defines the Git reference, pipeline, and additional parameters necessary to run the build.

3. Workflow Integration

Workflows will contain information on which trigger initiates them.

4. Project Simplification

Projects will be simplified and will no longer store information about triggers.
We explored how to handle SSH key management for repositories not hosted on GitHub or Bitbucket.

### Action Items

1. @radwo
   - Continue refining the trigger system proposal.
   
2. **All Attendees:**  
   - Review and provide feedback on the proposal once submitted.
