$fn=40;
module ServoMount(){difference(){
    union(){
translate([-10,-11,0])cube([20,35,9]);
hull(){translate([0,0,0])cylinder(d=10,h=3);
rotate([0,0,-45])translate([0,25,0])cylinder(d=10,h=3);    
} }
union(){
hull(){
cylinder(d=12,h=4);
translate([0,6,0])cylinder(d=6,h=4);}
translate([-6,-6,4])cube([12,23,5]);
translate([0,-8,0])cylinder(d=2,h=10);
translate([0,21,0])#cylinder(d=2,h=10);
}
rotate([0,0,-45])translate([0,25,0])cylinder(d=2,h=9);
rotate([0,0,-45])translate([0,25,0])cylinder(d=5,h=2);
}}

translate([-20,0,0])ServoMount();


difference(){
union(){
cylinder(d=8,h=2);
cylinder(d=5,h=4);
}
cylinder(d1=6,d2=2,h=3);
cylinder(d=2,h=4);}



module FlagMount(){
  difference(){  
      union(){
  cylinder(d=25.5,h=2);
  intersection(){
  cylinder(d=12.5,h=4);
  cube([8,20,10],true);
      }
      }
  rotate([0,0,45])translate([0,11,1])cylinder(d=4,h=2);
 
cylinder(d=2,h=8);    
  }  
}

module FlagConnect(){
    difference(){
        
    translate([-17,-10,0])cube([37,24,2]);
    #union(){
    hull(){    
    translate([0,0,1])cube([32,4,1]);
    translate([16,2,1])cylinder(d=5,h=1);
    }
        translate([16,2,0])cylinder(d=6.5,h=3);
    }
      #translate([-7,2,1])rotate([0,0,0])intersection(){
      cylinder(d=13.5,h=4);
  cube([8.5,20,10],true);
      }
      
    translate([-7,2,1])cylinder(d=2,h=8,center=true);
    }
    
}

color("Red")translate([20,-30,0])FlagConnect();

color("Red")translate([20,10,0])FlagMount();