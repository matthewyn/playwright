Feature: Workbook Validation

  Scenario Outline: Download & Modify Workbook
    Given File is already downloaded
    When File is already uploaded
    Then Price of Mango should be 350

    Examples:
        | Name | Password | Role |
        | Kenneth | Naga123000  | User  |
        | Willy | Naga321000  | Admin  |