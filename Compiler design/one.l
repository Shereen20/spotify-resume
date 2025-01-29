%%
int | flat| char {printf("Keyword\n");}
[a-zA-Z][a-zA-Z0-9]*    {printf("ID\n");}
[0-9]+  {printf("NUM\n");}
[' ' |\t|\n]    ;
.   {printf("other\n");}

[\+|\-|\*|\/]    {printf("arthmetic\n");}
[\<|\>|\>=|\<=|\!=|\==]   {printf("relational\n");}