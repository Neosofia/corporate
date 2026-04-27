require ["vnd.proton.expire"];
# permanently delete any email to/from a Neosofia domain after 90 days.
if anyof(address :matches "from" ["*@neosofia.tech"], address :matches "to" ["*@neosofia.tech"] )
{
 expire "day" "90";
}
