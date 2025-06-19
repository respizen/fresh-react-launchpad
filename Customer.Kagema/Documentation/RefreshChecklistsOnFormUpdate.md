
# RefreshChecklistsOnFormUpdate Setting Documentation

## Overview
The `RefreshChecklistsOnFormUpdate` setting controls whether checklists should be automatically refreshed and re-attached to service orders when dynamic forms are updated or modified.

## Purpose
This setting enables automatic checklist management to ensure that service orders always have the most current checklist configurations when their associated dynamic forms change.

## How It Works - Step by Step

### 1. Form Update Detection
- When a dynamic form that is associated with checklists gets updated/modified
- The system detects this change through form modification events
- This includes changes to form structure, fields, validation rules, or checklist relationships

### 2. Service Order Identification
- The system identifies all service orders that are currently using the updated form
- This includes both active and pending service orders
- Orders in completed states may be excluded depending on business rules

### 3. Checklist Relationship Evaluation
- For each affected service order, the system evaluates:
  - Current checklist attachments
  - New checklist requirements based on updated form
  - Installation type compatibility
  - Service order type compatibility

### 4. Checklist Refresh Process
When `RefreshChecklistsOnFormUpdate` is **enabled (true)**:
- Remove existing checklist attachments that are no longer valid
- Attach new checklists based on updated form requirements
- Preserve existing checklist data where possible
- Update checklist metadata (Required for completion, Send to customer, etc.)

When `RefreshChecklistsOnFormUpdate` is **disabled (false)**:
- No automatic checklist refresh occurs
- Existing checklist attachments remain unchanged
- Manual intervention required for checklist updates

### 5. Background Processing
- The refresh process typically runs in the background
- Uses the same logic as `ChecklistAttacherForImportedOrder` background service
- Processes orders in batches to avoid performance impact
- Logs all checklist attachment/detachment activities

### 6. Data Integrity
- Ensures referential integrity between forms and checklists
- Maintains audit trail of checklist changes
- Preserves completed checklist responses where applicable

## Configuration

### Default Value
- **Recommended**: `false` (disabled by default for data safety)
- **Production**: Should be carefully evaluated before enabling

### Settings File Location
- Template: `config/Plugins/Customer.Kagema/appSettings.Template.config`
- Environment-specific: `config/Plugins/Customer.Kagema/appSettings.config`

### Example Configuration
```xml
<add key="RefreshChecklistsOnFormUpdate" value="false" />
```

## Use Cases

### When to Enable (true)
- Development/testing environments
- When forms frequently change and automatic checklist sync is desired
- When manual checklist management is not feasible
- When data consistency is more important than preserving existing state

### When to Disable (false)
- Production environments with stable forms
- When preserving existing checklist data is critical
- When manual control over checklist updates is preferred
- When performance impact needs to be minimized

## Related Components
- `ChecklistAttacherForImportedOrder` background service
- Dynamic Forms system
- Service Order management
- Installation Type relationships

## Monitoring and Logging
The system logs all checklist refresh activities including:
- Form update events that trigger refresh
- Service orders affected
- Checklists added/removed
- Any errors during the refresh process

## Performance Considerations
- Large numbers of service orders may cause processing delays
- Batch processing limits impact on system performance
- Background execution prevents user interface blocking
- Consider scheduling during low-usage periods in production
